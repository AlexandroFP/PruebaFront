import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CapacityDemand } from '../core/models/capacity-demand.model';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
  ],
})
export class HomeComponent implements OnInit {
  demands: CapacityDemand[] = [];
  dataSource = new MatTableDataSource<CapacityDemand>();
  filterValue: string = '';
  displayedColumns: string[] = [
    'zone',
    'participant',
    'subaccount',
    'demandCapacityMW',
    'annualPowerRequirementMW',
    'efficientAnnualRequirementMW',
  ];
  selectedOrder: string = '';
  orderValues: any[] = [
    {value: 'zone', viewValue: 'Zona de Potencia'},
    {value: 'participant', viewValue: 'Participante'},
    {value: 'subaccount', viewValue: 'Subcuenta del Participante'},
    {value: 'demandCapacityMW', viewValue: 'Capacidad Demandada (MW)'},
    {value: 'annualPowerRequirementMW', viewValue: 'Requisito Anual de Potencia (MW-año)'},
    {value: 'efficientAnnualRequirementMW', viewValue: 'Requisito Anual Eficiente (MW-año)'},
  ];
  isLoading = false;
  error = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiSrv: ApiService) {}

  ngOnInit() {
    this.demands = [];
  }

  async getValues() {
  this.dataSource.data = [];
  this.isLoading = true;
  try {
    const response = await firstValueFrom(this.apiSrv.getCapacityDemands());
    this.demands = response.data;
    this.dataSource = new MatTableDataSource(this.demands);

    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    alert(response.message);
  } catch (err: any) {
    console.error('Error al obtener datos:', err);
    this.demands = [];
    alert(err?.error?.message || 'Error desconocido');
  } finally {
    this.isLoading = false;
  }
}




  sortBySelectedOrder() {
  const active = this.selectedOrder;
  const direction = 'asc';
  this.dataSource.sort?.sort({ id: active, start: direction, disableClear: false });
}

  applyFilter() {
    const value = this.filterValue.trim().toLowerCase();
    this.dataSource.filter = value;
  }

  inputClearable() {
    this.filterValue = '';
    this.applyFilter();
  }

 async deleteAll() {
  this.isLoading = true;
  try {
    const response = await firstValueFrom(this.apiSrv.deleteAllDemands());
    alert(response);
    await this.getValues(); 
  } catch (err: any) {
    console.error('Error al borrar:', err);
    alert('Error al eliminar los datos');
  } finally {
    this.isLoading = false;
  }
}


async downloadValues() {
  this.isLoading = true;
  try {
    const response = await firstValueFrom(this.apiSrv.downloadValues());
    alert(response);
    await this.getValues();
  } catch (err: any) {
    console.error('Error al descargar:', err);
    alert('Error: ' + err?.message || 'Error desconocido');
  } finally {
    this.isLoading = false;
  }
}

}
