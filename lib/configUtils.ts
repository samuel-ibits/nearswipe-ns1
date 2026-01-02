import mongoose from "mongoose";
import { Config, IConfig } from "../lib/models/Config";

/**
 * Get config for a specific event
 * @param eventId - Mongo ID string
 * @returns Promise<IConfig | null>
 */
export async function getConfig(eventId: string): Promise<IConfig | null> {
  try {
    return await Config.findOne({ event_id: eventId });
  } catch (err) {
    throw new Error("Error fetching event configuration: " + err);
  }
}

/**
 * Add a new config
 * @param data - config fields
 * @returns Promise<IConfig>
 */
export async function addConfig(data: IConfig): Promise<IConfig> {
  try {
    // Check if config already exists
    const existing = await Config.findOne({ event_id: data.event_id });
    if (existing) {
      throw new Error("Configuration already exists for this event");
    }

    // Create config with proper ObjectId
    const config = new Config({
      ...data,
      event_id: new mongoose.Types.ObjectId(data.event_id),
    });

    return await config.save();
  } catch (err) {
    throw new Error("Error creating configuration: " + err);
  }
}

/**
 * Update config by event id
 * @param eventId - event id
 * @param updateData - fields to update
 * @returns Promise<IConfig | null>
 */
export async function updateConfig(
  eventId: string,
  updateData: Partial<IConfig>
): Promise<IConfig | null> {
  try {
    const updatedConfig = await Config.findOneAndUpdate(
      { event_id: eventId },
      updateData,
      { new: true }
    );

    return updatedConfig;
  } catch (err) {
    throw new Error("Error updating configuration: " + err);
  }
}
