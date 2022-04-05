

import {IView, IMountArgs, ViewNode} from "./types";
import {tag} from "./html";

export function mountView(view: IView, mountArgs?: IMountArgs): ViewNode {
    let node;
    try {
        node = view.mount(mountArgs);
    } catch (err) {
        node = errorToDOM(err);
    }
    return node;
}

export function errorToDOM(error: Error): Element {
    const stack = new Error().stack;
    let callee: string | null = null;
    if (stack) {
        callee = stack.split("\n")[1];
    }
    return tag.div([
        tag.h2("Something went wrong…"),
        tag.h3(error.message),
        tag.p(`This occurred while running ${callee}.`),
        tag.pre(error.stack),
    ]);
}

export function insertAt(parentNode: Element, idx: number, childNode: Node): void {
    const isLast = idx === parentNode.childElementCount;
    if (isLast) {
        parentNode.appendChild(childNode);
    } else {
        const nextDomNode = parentNode.children[idx];
        parentNode.insertBefore(childNode, nextDomNode);
    }
}

export function removeChildren(parentNode: Element): void {
    parentNode.innerHTML = '';
}
