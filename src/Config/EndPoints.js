import AppConfig from "./AppConfig";

const ApiPrefix = AppConfig.BASE_URL + "/api/v1/";

export const EndPoints = {
    generateArtwork: ApiPrefix + "generate",
    moodBoardFilters: ApiPrefix + "moodboard_filter/get",
    getTemplates: ApiPrefix + "template",
    getSwapItems: ApiPrefix + "swap_items/get"
};
