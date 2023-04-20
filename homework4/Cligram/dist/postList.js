"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.createPost = exports.getAllPost = exports.postList = void 0;
exports.postList = [];
const getAllPost = () => {
    return exports.postList;
};
exports.getAllPost = getAllPost;
const createPost = (nowLoginUser, inputContent, newPostId) => {
    exports.postList.push({
        id: newPostId,
        writerId: nowLoginUser.id,
        content: inputContent,
        createdAt: new Date()
    });
};
exports.createPost = createPost;
const deletePost = (nowLoginUser, id) => {
    const filteredPost = exports.postList.filter((i) => i.id === parseInt(id));
    if (filteredPost.length !== 0) {
        if (filteredPost[0].writerId !== nowLoginUser.id) {
            return "notMatch";
        }
        else {
            exports.postList = exports.postList.filter((post) => post !== filteredPost[0]);
            return "complete";
        }
    }
    else {
        return "notExist";
    }
};
exports.deletePost = deletePost;
