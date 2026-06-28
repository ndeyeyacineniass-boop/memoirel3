import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  type?: 'text' | 'number' | 'date' | 'boolean' | 'status' | 'avatar' | 'actions' | 'custom';
  format?: string;
  actions?: TableAction[];
  altKey?: string;
  template?: any;
}

export interface TableAction {
  label: string;
  icon: string;
  action: string;
  type?: string;
  tooltip?: string;
  showLabel?: boolean;
  color?: 'primary' | 'accent' | 'warn';
  disabled?: (row: any) => boolean;
  hidden?: (row: any) => boolean;
}

export interface TableFilter {
  key: string;
  value: any;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' | 'between';
}

export interface TableState {
  page: number;
  pageSize: number;
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
  filters: TableFilter[];
  searchTerm: string;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './data-table.html',
  styleUrls: ['./data-table.scss']
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() loading: boolean = false;
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  @Input() showSearch: boolean = true;
  @Input() showFilters: boolean = true;
  @Input() showPagination: boolean = true;
  @Input() showExport: boolean = false;
  @Input() showRefresh: boolean = false;
  @Input() showControls: boolean = true;
  @Input() showActions: boolean = false;
  @Input() striped: boolean = true;
  @Input() bordered: boolean = true;
  @Input() hoverable: boolean = true;
  @Input() emptyMessage: string = 'Aucune donnée disponible';
  @Input() emptyTitle: string = 'Aucune donnée';
  @Input() emptyAction: any = null;
  @Input() loadingMessage: string = 'Chargement en cours...';
  @Input() searchPlaceholder: string = 'Rechercher...';
  @Input() filters: any[] = [];
  @Input() rowActions: TableAction[] = [];
  @Input() itemsPerPage: number = 10;
  @Input() itemsPerPageOptions: number[] = [5, 10, 25, 50];

  @Output() rowClick = new EventEmitter<any>();
  @Output() actionClick = new EventEmitter<{ action: string; row: any }>();

  // Internal properties
  searchTerm: string = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage: number = 1;
  paginatedData: any[] = [];
  totalPages: number = 1;
  startIndex: number = 0;
  endIndex: number = 0;
  visiblePages: (number | string)[] = [];

  ngOnInit(): void {
    this.updatePagination();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['itemsPerPage']) {
      this.updatePagination();
    }
  }

  // Search and filter methods
  onSearch(): void {
    this.currentPage = 1;
    this.updatePagination();
  }

  toggleFilter(filter: any): void {
    filter.active = !filter.active;
    this.updatePagination();
  }

  onItemsPerPageChange(): void {
    this.currentPage = 1;
    this.updatePagination();
  }

  // Export and refresh methods
  exportData(): void {
    // Implementation for data export
    console.log('Exporting data...');
  }

  refreshData(): void {
    // Implementation for data refresh
    console.log('Refreshing data...');
  }

  // Sorting methods
  sort(columnKey: string): void {
    if (this.sortColumn === columnKey) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = columnKey;
      this.sortDirection = 'asc';
    }
    this.updatePagination();
  }

  // Row methods
  onRowClick(row: any, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.rowClick.emit(row);
  }

  isRowSelected(row: any): boolean {
    return false; // Simple implementation
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  // Cell value methods
  getCellValue(row: any, columnKey: string): any {
    return row[columnKey];
  }

  getStatusLabel(status: string): string {
    const statusLabels: { [key: string]: string } = {
      'active': 'Actif',
      'inactive': 'Inactif',
      'pending': 'En attente',
      'completed': 'Terminé',
      'cancelled': 'Annulé'
    };
    return statusLabels[status] || status;
  }

  getInitials(name: string): string {
    if (!name) return '';
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
  }

  // Action methods
  executeAction(action: TableAction, row: any, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.actionClick.emit({ action: action.action, row });
  }

  // Pagination methods
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  private updatePagination(): void {
    let filteredData = [...this.data];

    // Apply search
    if (this.searchTerm) {
      filteredData = filteredData.filter(row =>
        this.columns.some(col => {
          const value = row[col.key];
          return value && String(value).toLowerCase().includes(this.searchTerm.toLowerCase());
        })
      );
    }

    // Apply sorting
    if (this.sortColumn) {
      filteredData.sort((a, b) => {
        const aVal = a[this.sortColumn];
        const bVal = b[this.sortColumn];
        
        if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Calculate pagination
    this.totalItems = filteredData.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.endIndex = Math.min(this.startIndex + this.itemsPerPage, this.totalItems);
    
    // Get current page data
    this.paginatedData = filteredData.slice(this.startIndex, this.endIndex);
    
    // Calculate visible pages
    this.calculateVisiblePages();
  }

  private calculateVisiblePages(): void {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (this.totalPages <= maxVisible) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (this.currentPage > 3) {
        pages.push('...');
      }
      
      const start = Math.max(2, this.currentPage - 1);
      const end = Math.min(this.totalPages - 1, this.currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (this.currentPage < this.totalPages - 2) {
        pages.push('...');
      }
      
      pages.push(this.totalPages);
    }
    
    this.visiblePages = pages;
  }
}
