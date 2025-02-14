import { Dexie, Table } from "dexie";
import { GridState } from "../types/types";

class GridDb extends Dexie {
  gridStates!: Table<GridState>;

  constructor() {
    super("gridDb");
    this.version(1).stores({
      gridStates: "++id, createdAt, name",
    });
  }

  async saveGridState(state: Omit<GridState, "id" | "createdAt">) {
    return await this.gridStates.add({
      ...state,
      createdAt: new Date(),
    });
  }

  async loadGridState(id: number) {
    return await this.gridStates.get(id);
  }

  async getAllGridStates() {
    return await this.gridStates.orderBy("createdAt").reverse().toArray();
  }

  async deleteGridState(id: number) {
    return await this.gridStates.delete(id);
  }
}

export const gridDb = new GridDb();
