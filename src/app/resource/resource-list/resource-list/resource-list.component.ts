import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ReqresPageReponse } from 'src/app/model/base/reqres-page.response';
import { ResourceResponse } from 'src/app/model/responses/resource.response';
import { ResourceService } from 'src/app/service/resource.service';

interface PageEvent {
  first?: number;
  rows?: number;
  page?: number;
  pageCount?: number;
}

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css'],
})
export class ResourceListComponent implements OnInit {
  items: MenuItem[] = [];

  resourcePage?: ReqresPageReponse<ResourceResponse>;

  resources: ResourceResponse[] = [];

  first: number = 0;
  rows: number = 6;

  constructor(private resourceService: ResourceService) {}

  ngOnInit() {
    this.resourceService.getListResources().subscribe((data) => {
      this.resourcePage = data;
      this.resources = this.resourcePage.data;
    });
  }

  onPageChange(event: PageEvent) {
    console.log(event);

    this.resourceService
      .getListResources(Number(event.page) + 1)
      .subscribe((data) => {
        this.resourcePage = data;
        this.resources = this.resourcePage.data;
      });
  }
}
