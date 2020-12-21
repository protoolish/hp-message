enum ActionType {
    GOOD = "primary",
    BAD = "danger",
    PLAIN = ""
}

export default class Action { 
    name:string;
    resolved: boolean;
    type: ActionType;
    exec: Function;

    constructor(
        name: string, 
        resolved: boolean = true,
        type: ActionType = ActionType.PLAIN,
        exec: Function = () => {return this.name;}
    ){
        this.name = name;
        this.resolved = resolved;
        this.type = type;
        this.exec = exec;
    }; 
}