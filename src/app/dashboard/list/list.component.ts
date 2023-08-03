import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/user-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  public records!: any[];

  displayedColumns: string[] = ['name', 'email', 'phone', 'city', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    // Get data from sessionStorage and parse it to an array
    const data = sessionStorage.getItem('userData');
    this.records = data ? JSON.parse(data) : [];

    // Create the MatTableDataSource and set sorting and pagination
    this.dataSource = new MatTableDataSource(this.records);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onEdit(record: any): void {

    // Navigate to the RegisterComponent for editing
    this.router.navigate(['/register', { isEditable: true }]);
  }

  onDelete(record: any): void {
    // Find the index of the record in the records array
    const index = this.dataSource.data.findIndex((rec) => rec === record);

    // If the record is found, remove it from the records array
    if (index !== -1) {
      this.dataSource.data.splice(index, 1);

      // Update the data source
      this.dataSource = new MatTableDataSource(this.dataSource.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      // Save the updated records array in sessionStorage
      sessionStorage.setItem('userData', JSON.stringify(this.dataSource.data));
    }
  }
}
