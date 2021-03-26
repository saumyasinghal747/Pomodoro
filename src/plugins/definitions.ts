export class Task {
    pomodoros : number;
    name : string;
    note : string;
    id : string;
    constructor(name : string, pomodoros = 1, note='') {
        this.pomodoros = pomodoros;
        this.name = name;
        this.note = note;
        this.id = Math.random().toString(36).substr(2, 9)
    }

}

export type status = 'pomo' | 'short' | 'long';
