import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const DELETION_TRANSLATION_KEY = 'Deletion';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  sourceTable = [
    [
      { label1: '', label2: '' }
    ]
  ];
  formatedTable: string;
  faMinusCircle = faMinusCircle;
  faPlusCircle = faPlusCircle;

  constructor() { }

  ngOnInit() {
    this.generateTable(this.sourceTable);
  }

  addRow() {
    this.sourceTable.push(new Array(this.sourceTable[0].length).fill(null).map(value => ({ label1: '', label2: '' })));
    this.generateTable(this.sourceTable);
  }

  addColumn() {
    this.sourceTable.forEach(row => row.push({ label1: '', label2: '' }));
    this.generateTable(this.sourceTable);
  }

  removeRow(rowIndex) {
    if (rowIndex === 0 && this.sourceTable.length <= 1) {
      return;
    }
    this.sourceTable.splice(rowIndex, 1);
    this.generateTable(this.sourceTable);
  }

  removeCol(colIndex) {
    if (colIndex === 0 && this.sourceTable[0].length <= 1) {
      return;
    }
    this.sourceTable.forEach(row => row.splice(colIndex, 1));
    this.generateTable(this.sourceTable);
  }

  generateTable(table: Array<Array<{ label1: string; label2: string; }>>) {
    let cellContentWidth = _.flattenDeep(table)
      .map((cell: { label1: string; label2: string; }) => cell && cell.label1 ? cell.label1.length : 0)
      .sort((a, b) => a < b ? -1 : 1)
      .reverse()[0];
    cellContentWidth = cellContentWidth > 4 ? cellContentWidth : 4;

    const formatedRows = table.map((row: Array<{ label1: string; label2: string; }>) => {
      const formatedLabelRow = row.map((cell: { label1: string; label2: string; }) => {
        const labelContent = cell && cell.label1 ? cell.label1 : '';
        return ` ${labelContent}${'\xa0'.repeat(cellContentWidth - labelContent.length)} `;
      });
      const formatedScoreRow = row.map((cell: { label1: string; label2: string; }) => {
        const scoreContent = cell && cell.label2 ? `${cell.label2}`.slice(0, 4) : '';
        return ` ${scoreContent}${'\xa0'.repeat(cellContentWidth - scoreContent.length)} `;
      });
      return `|${formatedLabelRow.join('|')}|\n|${formatedScoreRow.join('|')}|\n`;
    });


    const separatorLine = `${'-'.repeat((formatedRows[0].length / 2) - 1)}\n`;
    const formatedTable = formatedRows.join(separatorLine);
    this.formatedTable = `${separatorLine}${formatedTable}${separatorLine}`;
  }
}
