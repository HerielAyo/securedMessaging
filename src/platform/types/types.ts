

import type {RequestResult} from "../web/dom/request/fetch.js";
import type {EncodedBody} from "../../matrix/net/common";
import type {ILogItem} from "../../logging/types";

export interface IRequestOptions {
    uploadProgress?: (loadedBytes: number) => void;
    timeout?: number;
    body?: EncodedBody;
    headers?: Map<string, string|number>;
    cache?: boolean;
    method?: string;
    format?: string;
}

export type RequestFunction = (url: string, options: IRequestOptions) => RequestResult;

export interface IBlobHandle {
    nativeBlob: any;
    url: string;
    size: number;
    mimeType: string;
    readAsBuffer(): BufferSource;
    dispose()
}

export type File = {
    readonly name: string;
    readonly blob: IBlobHandle;
}
