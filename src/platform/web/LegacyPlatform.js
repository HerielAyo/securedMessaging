 

import aesjs from "aes-js";
import {hkdf} from "../../utils/crypto/hkdf";

import {Platform as ModernPlatform} from "./Platform.js";

export function Platform(container, assetPaths, config, options = null) {
    return new ModernPlatform(container, assetPaths, config, options, {aesjs, hkdf});
}
