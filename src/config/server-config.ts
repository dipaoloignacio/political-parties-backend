export const SERVER_CONFIG = {
    port: Number(process.env.PORT) || 3200,
    defaulchannelName: process.env.DEFAULT_CHANNEL || "political-parties",
} as const