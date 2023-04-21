import { Component, ViewChild} from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { SharedService } from 'src/app/services/shared.service';


export interface AppData {
  id: string;
  name: string;
  consumerQuantity: string;
  cost: string;
}


@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent {
  displayedColumns: string[] = ['id', 'name','date', 'consumerQuantity', 'cost'];
  dataSource: MatTableDataSource<AppData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  searchControl = new FormControl('');
  options: string[] = [];
  appsFilteredOptions: Observable<string[]>;

  loader = false;

  constructor(private sharedService: SharedService, private _liveAnnouncer: LiveAnnouncer) {
  }

  ngOnInit() {
    this.appsFilteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.searchControl.valueChanges.subscribe(appName => this.getApplicationsByName(appName))
  }

  ngAfterViewInit() {
    this.getAllApplications();
  }

  getAllApplications() {
    this.sharedService.getAllApplications().subscribe((allAppsData: string[]) => {
      this.options = allAppsData;
      this.searchControl.setValue(allAppsData[0]);
      this.getApplicationsByName(allAppsData[0]);
    });
  }

  getApplicationsByName(name: string) {
    this.loader = true;
    this.dataSource = new MatTableDataSource([]);
    this.sharedService.getApplicationByName(name).subscribe((appData: AppData[]) => {
      this.dataSource = new MatTableDataSource(appData);
      this.dataSource.paginator = this.paginator;
      this.loader = false;
    },() => {
      this.loader = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
