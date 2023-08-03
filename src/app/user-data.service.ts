import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private records: any[] = [];

  setData(data: any): void {
    this.records.push(data);
  }

  getData(): any {
    return this.records.length ? this.records[this.records.length - 1] : null;
  }

  addRecord(record: any): void {
    this.records.push(record);
  }

  updateRecord(updatedRecord: any): void {
    const index = this.records.findIndex(record => record === this.getData());
    if (index !== -1) {
      this.records[index] = updatedRecord;
    }
  }

  getRecords(): any[] {
    return this.records;
  }

  clearData(): void {
    this.records = [];
  }
}
