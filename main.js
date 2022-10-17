const SimpleComp = (params) => params.value

var columnDefs = [
  {headerName: 'Make' , field: 'make',cellRenderer: SimpleComp},
  {headerName: 'Model' , field: 'model'},
  {headerName: 'Price' , field: 'price'},
];


// var rowData = [
//     {make: 'toyata' , model: 'clicica', price: 3500},
//     {make: 'BMW' , model: 'bmw-12', price: 34640},
//     {make: 'marvi-suzki' , model: 'civic-23', price: 1237648},
// ];

var autoGroupColumnDef ={
    headerName: 'Model',
    field: 'model',
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams:{
        checkbox: true
    }
}

var gridOptions = {
    columnDefs: columnDefs,
    autoGroupColumnDef: autoGroupColumnDef,
    // rowData: rowData,
    rowSelection: 'multiple',
    groupSelectsChildren: true,
    animateRows: true,
    onCellClicked: params => {
        console.log('cell was clicked', params)
    } , 
    defaultColDef:{
        sortable: true,
        resizable: true,
        filter: true,
        enableRowGroup: true
    },
    rowGroupPanelShow: 'always'
};

// setup the grid after the page has finished loading
    var eGridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(eGridDiv, gridOptions);

    agGrid.simpleHttpRequest({
        url: 'https://www.ag-grid.com/example-assets/row-data.json'
    })
   .then(function(data){
      gridOptions.api.setRowData(data);
   })

   agGrid.simpleHttpRequest({
    url: 'https://www.ag-grid.com/example-assets/row-data.json'
})
.then(function(data){
  gridOptions.api.setRowData(data);
})


function getSelectedRows(){
    var selectedNodes= gridOptions.api.getSelectedNodes();
    var selectedData = selectedNodes.map(node => node.data);
    var  selectedDataStringPresentation= selectedData.map(node => node.make + ' '+node.model).join(', ');
    alert('selected nodes: '+ selectedDataStringPresentation);
}

function deSelecte(){
    gridOptions.api.deselectAll()
}