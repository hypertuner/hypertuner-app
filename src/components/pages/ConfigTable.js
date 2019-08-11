import React from 'react';
import MaterialTable, { MTableEditField , MTableCell} from 'material-table';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  }
}));

const typeLookupMap = { 0: 'float', 1: 'integer', 2: 'boolean' }

export default function ConfigTable() {
  const classes = useStyles();
  const title = <TextField
    id="standard-with-placeholder"
    label="Add Config Title"
    className={classes.textField}
    margin="normal"
  />
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      {
        title: 'Type',
        field: 'type',
        lookup: typeLookupMap,
      },
      { title: 'Value', field: 'value' },
    ],
    data: [
      { name: "val0", type: 0, value: 0.01 },
      { name: "val1", type: 1, value: 10 },
    ],
  });

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
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
          }),
      }}
    />
  );
}
