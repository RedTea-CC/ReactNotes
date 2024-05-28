import Redis from "ioredis";

/**
 * Redis client instance.
 * @type {Redis}
 */
const redis = new Redis(6379);

/**
 * Initial data for the notes.
 * @type {Object}
 */
const initialData = {
  1702459181837:
    '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  1702459182837:
    '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  1702459188837:
    '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}',
};

/**
 * Retrieves all notes from Redis.
 * If there are no notes, initializes Redis with the initial data.
 * @returns {Promise<Object>} A promise that resolves to an object containing all the notes.
 */
export async function getAllNotes() {
  const data = await redis.hgetall("notes");
  if (Object.keys(data).length == 0) {
    await redis.hset("notes", initialData);
  }
  return await redis.hgetall("notes");
}

/**
 * Adds a new note to Redis.
 * @param {string} data - The data of the note to be added.
 * @returns {Promise<string>} A promise that resolves to the UUID of the added note.
 */
export async function addNote(data) {
  const uuid = Date.now().toString();
  await redis.hset("notes", [uuid], data);
  return uuid;
}

/**
 * Updates a note in Redis.
 * @param {string} uuid - The UUID of the note to be updated.
 * @param {string} data - The updated data of the note.
 */
export async function updateNote(uuid, data) {
  await redis.hset("notes", [uuid], data);
}

/**
 * Retrieves a note from Redis.
 * @param {string} uuid - The UUID of the note to be retrieved.
 * @returns {Promise<Object>} A promise that resolves to an object representing the retrieved note.
 */
export async function getNote(uuid) {
  return JSON.parse(await redis.hget("notes", uuid));
}

/**
 * Deletes a note from Redis.
 * @param {string} uuid - The UUID of the note to be deleted.
 * @returns {Promise<number>} A promise that resolves to the number of deleted notes (0 or 1).
 */
export async function delNote(uuid) {
  return redis.hdel("notes", uuid);
}

export default redis;
