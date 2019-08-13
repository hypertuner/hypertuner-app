import React from 'react';
import MaterialTable, { MTableEditField , MTableCell} from 'material-table';

export default function ConfigTable({state, setState, typeLookupMap, title}) {
  
  return (
    <MaterialTable
      title={title}
      columns={state.columns}
      data={state.data}
      options={{
        actionsColumnIndex: -1
      }}
      components={{
        EditField: ({ columnDef, rowData, ...props }) => {
          if (columnDef.field === 'value') {
            columnDef.type = typeLookupMap[rowData.type]
          }
          return (
            <MTableEditField {...props} {...{columnDef, rowData}} />
          )
        },
        Cell: ({ columnDef, rowData, ...props}) => {
          if (columnDef.field === 'value') {
            columnDef.type = typeLookupMap[rowData.type]
          }
          return (
            <MTableCell {...props} {...{columnDef, rowData}} />
          )
        }
      }}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.push(newData);
              console.log(data);
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              console.log(data);
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              console.log(data);
              setState({ ...state, data });
            }, 600);
          }),
      }}
    />
  );
}
