export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}


export class PriorityUtil {
  static getKey(priority: string) {
      const priorityTypes: Record<string, string> = Priority;
      let key = Object.keys(Priority).filter((key: string) => priorityTypes[key] == priority);
      return key.length > 0 ? key[0] : null;
  }

  static getIterableArray(){
      const priorityTypes: Record<string, string> = Priority;
      const priorityArray: {key: string, value: string}[] = Object.keys(priorityTypes).map(key => ({key, value: priorityTypes[key]}))

      return priorityArray
  }

  static getValue(priorityKey: string){
      const priorityTypes: Record<string, string> = Priority;

      if(!priorityTypes[priorityKey]) return ''

      return priorityTypes[priorityKey]
  }
}
