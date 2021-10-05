import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Highcharts from 'highcharts';
import HighchartsNetworkgraph from 'highcharts/modules/networkgraph';
HighchartsNetworkgraph(Highcharts);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  Highcharts: typeof Highcharts = Highcharts;

  dataForm = new FormGroup({
    jsonData: new FormControl(
      JSON.stringify({
        vertices: [
          {
            id: 'n1',
            label: 'Node 1',
            type: 'node',
          },
          {
            id: 'n2',
            label: 'Node 2',
            type: 'node',
          },
          {
            id: 'a1',
            label: 'Alarm 1',
            type: 'alarm',
          },
        ],
        edges: [
          {
            id: 'e1',
            label: 'edge n1-n2',
            type: 'link',
            source_id: 'n1',
            target_id: 'n2',
          },
          {
            id: 'e2',
            label: 'edge n2-a1',
            type: 'link',
            source_id: 'n2',
            target_id: 'a1',
          },
        ],
      }),
      Validators.required
    ),
  });
  get jsonData() {
    return this.dataForm.get('jsonData');
  }
  nodes: any = [];
  links: any = [];

  chartOptions: Highcharts.Options;
  marker = {
    radius: 20,
  };
  dataLabels = {
    enabled: true,
    linkFormat: '',
  };
  title = {
    text: 'Graph',
  };

  constructor() {
    this.nodes = this.getNodesFromJson();
    this.links = this.getLinksFromJson();

    this.chartOptions = {
      title: this.title,
      series: [
        {
          layoutAlgorithm: {
            enableSimulation: true,
            integration: 'verlet',
            linkLength: 100,
          },
          dataLabels: this.dataLabels,
          marker: this.marker,
          nodes: this.nodes,
          data: this.links,
          type: 'networkgraph',
        },
      ],
    };
  }

  onSubmit() {
    this.nodes = this.getNodesFromJson();
    this.links = this.getLinksFromJson();
    this.chartOptions = {
      title: this.title,
      series: [
        {
          layoutAlgorithm: {
            enableSimulation: true,
            integration: 'verlet',
            linkLength: 100,
          },
          dataLabels: this.dataLabels,
          marker: this.marker,
          nodes: this.nodes,
          data: this.links,
          type: 'networkgraph',
        },
      ],
    };
  }

  getNodesFromJson() {
    return JSON.parse(this.jsonData?.value.trim()).vertices.map((v: any) => {
      return {
        id: v.id,
      };
    });
  }

  getLinksFromJson() {
    let links: any = [];
    JSON.parse(this.jsonData?.value.trim()).edges.forEach((item: any) => {
      links.push([item.source_id, item.target_id]);
    });
    return links;
  }
}
