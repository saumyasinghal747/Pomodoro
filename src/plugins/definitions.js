"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
var Task = /** @class */ (function () {
    function Task(name, pomodoros, note) {
        if (pomodoros === void 0) { pomodoros = 1; }
        if (note === void 0) { note = ''; }
        this.pomodoros = pomodoros;
        this.name = name;
        this.note = note;
        this.id = Math.random().toString(36).substr(2, 9);
    }
    return Task;
}());
exports.Task = Task;
