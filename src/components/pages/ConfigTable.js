import React, { useState, useContext } from 'react'
import MaterialTable, { MTableEditField, MTableCell } from 'material-table'
import { AddConfigContext } from './AddConfig';


export default function ConfigTable({
  defaultData,
  columns,
  typeLookupMap,
  title
}) {
  const [data, setData] = useState(defaultData)
  const { setData : setParentData } = useContext(AddConfigContext);

  return (
    <MaterialTable
      title={title}
      columns={columns}
      data={data}
      options={{
        actionsColumnIndex: -1,
        addRowPosition: 'first'
      }}
      components={{
        EditField: ({ columnDef, rowData, ...props }) => {
          if (columnDef.field === 'value') {
            columnDef.type = typeLookupMap[rowData.type]
          }
          return <MTableEditField {...props} {...{ columnDef, rowData }} />
        },
        Cell: ({ columnDef, rowData, ...props }) => {
          if (columnDef.field === 'value') {
            columnDef.type = typeLookupMap[rowData.type]
          }
          return <MTableCell {...props} {...{ columnDef, rowData }} />
        }
      }}
      editable={{
        onRowAdd: async newData => {
          const alpha = [newData, ...data]

          setData(alpha)
          setParentData(alpha)
        },
        onRowUpdate: async (newData, oldData) => {
          setData(currentData => {
            currentData[currentData.indexOf(oldData)] = newData
            const alpha = [...currentData]
            setParentData(alpha)
            return alpha
          })
        },
        onRowDelete: async oldData => {
          setData(currentData => {
            currentData.splice(currentData.indexOf(oldData), 1)
            const alpha = [...currentData]
            setParentData(alpha)
            return alpha
          })
        }
      }}
    />
  )
}
