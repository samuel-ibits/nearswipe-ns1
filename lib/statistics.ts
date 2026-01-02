// lib/statistics.ts
import { Event } from "@/lib/models/Event";
import Order from "@/lib/models/Order";
import TicketKey from "@/lib/models/TicketKey";
import Ticket from "@/lib/models/Ticket";
import { TicketOrder } from "@/types/ticket";
import dayjs from "dayjs";

export const getTotalTicketsSoldByUser = async (userId: string) => {
  // Step 1: Get all event IDs owned by the user
  const userEvents = await Event.find({ owner: userId }).select("_id");
  const eventIds = userEvents.map((event) => event._id);

  if (eventIds.length === 0) return 0;

  // Step 2: Get all orders for those events
  const orders = await Order.find({ eventId: { $in: eventIds } }).select("_id");
  const orderIds = orders.map((order) => order._id);

  if (orderIds.length === 0) return 0;
  const startOfWeek = dayjs().startOf("week").toDate();
  const endOfWeek = dayjs().endOf("week").toDate();
  // Step 3: Count TicketKeys linked to those orders
  const ticketCount = await TicketKey.countDocuments({
    orderId: { $in: orderIds },
    createdAt: { $gte: startOfWeek, $lte: endOfWeek },
  });

  return ticketCount;
};

export async function getUserTotalIncome(userId: string) {
  // Step 1: Get all event IDs owned by the user
  const userEvents = await Event.find({ owner: userId }).select("_id");
  const eventIds = userEvents.map((event) => event._id);

  if (eventIds.length === 0) return 0;

  // Step 2: Get all orders for those events
  const orders = await Order.find({ eventId: { $in: eventIds } }).select("_id");
  const orderIds = orders.map((order) => order._id);

  if (orderIds.length === 0) return 0;

  // Step 3: Count TicketKeys linked to those orders
  const ticketCount = await TicketKey.countDocuments({
    orderId: { $in: orderIds },
  });
  // Step 4: Calculate total income from made from tickets sold, the price of the ticket can be found in the TicketOrder
  // array of the Order model, which is linked to the TicketKey model via orderId
  const ticketKeys = await TicketKey.find({ orderId: { $in: orderIds } });
  const orderMap = new Map(orders.map((o) => [o._id.toString(), o.tickets]));
  const prices: number[] = [];
  for (const tk of ticketKeys) {
    const orderTickets = orderMap.get(tk.orderId.toString());
    if (!orderTickets) continue;

    const ticketInfo = orderTickets.find(
      (t: TicketOrder) => t.ticketId.toString() === tk.ticketId
    );
    if (ticketInfo) prices.push(ticketInfo.price || 0);
  }

  return ticketCount;
};

export async function getUserWeeklyStats(
  userId: string,
  startOfWeek: Date,
  endOfWeek: Date
) {
  // Step 1: Get all event IDs created by the user
  const events = await Event.find({ owner: userId }).select("_id");
  const eventIds = events.map((e) => e._id);

  if (eventIds.length === 0)
    return {
      ticketsSold: 0,
      avgTicketPrice: 0,
      walletEarnings: 0,
      dailySales: [],
    };

  // Step 2: Get orders for those events
  const orders = await Order.find({ eventId: { $in: eventIds } }).select(
    "_id tickets"
  );
  const orderIds = orders.map((o) => o._id);

  if (orderIds.length === 0)
    return {
      ticketsSold: 0,
      avgTicketPrice: 0,
      walletEarnings: 0,
      dailySales: [],
    };

  // Step 3: Get ticket keys created this week
  const ticketKeys = await TicketKey.find({
    orderId: { $in: orderIds },
    createdAt: { $gte: startOfWeek, $lte: endOfWeek },
  });

  const ticketsSold = ticketKeys.length;

  // Step 4: Calculate ticket price earnings
  const orderMap = new Map(orders.map((o) => [o._id.toString(), o.tickets]));
  const prices: number[] = [];

  for (const tk of ticketKeys) {
    const orderTickets = orderMap.get(tk.orderId.toString());
    if (!orderTickets) continue;

    const ticketInfo = orderTickets.find(
      (t: TicketOrder) => t.ticketId.toString() === tk.ticketId
    );
    if (ticketInfo) prices.push(ticketInfo.price || 0);
  }

  const walletEarnings = prices.reduce((sum, p) => sum + p, 0);
  const avgTicketPrice = walletEarnings / (prices.length || 1);

  // Step 5: Get tickets sold each day this week
  const dailySales = await Promise.all(
    [...Array(7)].map(async (_, i) => {
      const day = dayjs(startOfWeek).add(i, "day");
      const nextDay = day.add(1, "day");

      const count = await TicketKey.countDocuments({
        orderId: { $in: orderIds },
        createdAt: { $gte: day.toDate(), $lt: nextDay.toDate() },
      });

      return {
        day: day.format("ddd"), // e.g., Mon, Tue
        count,
      };
    })
  );

  return {
    ticketsSold,
    avgTicketPrice,
    walletEarnings,
    dailySales,
  };
}

export async function getUserAllTimeStats(
  userId: string,
  totalVisitors: number
) {
  // Step 1: Get all events by the user
  const events = await Event.find({ owner: userId }).select("_id");
  const eventIds = events.map((e) => e._id);

  if (eventIds.length === 0) {
    return {
      totalTickets: 0,
      totalRevenue: 0,
      totalCustomers: 0,
      conversionRate: "0.0",
    };
  }

  // Step 2: Get all tickets tied to those events
  const tickets = await Ticket.find({ event: { $in: eventIds } });
  const totalTickets = tickets.reduce((sum, t) => sum + (t.quantity || 0), 0);

  const totalRevenue = tickets.reduce((sum, t) => {
    const price = t.price || 0;
    const quantity = t.quantity || 0;
    return sum + price * quantity;
  }, 0);

  // Step 3: Get number of orders tied to those events (customers)
  const totalCustomers = await Order.distinct("owner", {
    eventId: { $in: eventIds },
  }).then((owners) => owners.length);

  // Step 4: Simplified conversion rate
  const conversionRate =
    totalVisitors > 0
      ? ((totalCustomers / totalVisitors) * 100).toFixed(1)
      : "0.0";

  return {
    totalTickets,
    totalRevenue,
    totalCustomers,
    conversionRate,
  };
}

export async function getTopPerformingEvents(userId: string, limit = 4) {
  // Step 1: Get the user's events
  const events = await Event.find({ owner: userId }).select("_id name");
  const eventMap = new Map(events.map((e) => [e._id.toString(), e.name]));
  const eventIds = [...eventMap.keys()];

  if (eventIds.length === 0) return { topEvents: [], topTicket: null };

  // Step 2: Get relevant orders (linked to user's events)
  const orders = await Order.find({ eventId: { $in: eventIds } }).select(
    "_id eventId tickets"
  );
  const orderMap = new Map(orders.map((o) => [o._id.toString(), o]));

  const orderIds = orders.map((o) => o._id);

  if (orderIds.length === 0) return { topEvents: [], topTicket: null };

  // Step 3: Get all TicketKeys (sold tickets)
  const ticketKeys = await TicketKey.find({ orderId: { $in: orderIds } });

  // Step 4: Aggregate ticket sales and revenue per event
  const eventStats = new Map<string, { tickets: number; revenue: number }>();

  // Additional: Track ticket stats
  const ticketStats = new Map<
    string,
    { name: string; tickets: number; revenue: number }
  >();

  // Fetch all ticket data to get names
  const allTicketIds = [...new Set(ticketKeys.map((tk) => tk.ticketId))];
  const ticketDocs = await Ticket.find({ _id: { $in: allTicketIds } }).select(
    "_id name"
  );
  const ticketMap = new Map(ticketDocs.map((t) => [t._id.toString(), t.name]));

  for (const tk of ticketKeys) {
    const order = orderMap.get(tk.orderId.toString());
    if (!order) continue;

    const ticketId = tk.ticketId.toString();
    const ticketInfo = order.tickets.find(
      (t: TicketOrder) => t.ticketId.toString() === ticketId
    );
    const price = ticketInfo?.price || 0;

    const eventId = order.eventId.toString();
    const existingEvent = eventStats.get(eventId) || { tickets: 0, revenue: 0 };
    eventStats.set(eventId, {
      tickets: existingEvent.tickets + 1,
      revenue: existingEvent.revenue + price,
    });

    // Update ticket stats
    const existingTicket = ticketStats.get(ticketId) || {
      name: ticketMap.get(ticketId) || "Unnamed Ticket",
      tickets: 0,
      revenue: 0,
    };
    ticketStats.set(ticketId, {
      ...existingTicket,
      tickets: existingTicket.tickets + 1,
      revenue: existingTicket.revenue + price,
    });
  }

  // Step 5: Sort and return top N events
  const topEvents = [...eventStats.entries()]
    .sort((a, b) => b[1].tickets - a[1].tickets)
    .slice(0, limit)
    .map(([eventId, stats]) => ({
      name: eventMap.get(eventId) || "Unnamed Event",
      tickets: stats.tickets,
      revenue: stats.revenue,
    }));

  // Step 6: Determine top-performing tickets
  const sortedTickets = [...ticketStats.values()].sort(
    (a, b) => b.tickets - a.tickets
  );
  const topTickets = sortedTickets.slice(0, limit);

  return {
    topEvents,
    topTickets,
  };
}
