import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import {DataManager,ODataV4Adaptor,Query} from '@syncfusion/ej2-data';
import './App.css';

function App() {
  let remoteData : DataManager = new DataManager({
    url:'https://services.odata.org/V4/Northwind/Northwind.svc',
    adaptor: new ODataV4Adaptor,
    crossDomain: true
  });
  let dataQuery : Query = new Query().from('Employees').select('EmployeeID,FirstName,Title').take(5);
  let childDataQuery : Query = new Query().from('Orders').select('OrderID,EmployeeID,ShipName').take(5);
  let remoteDataFields : object ={
    dataSource: remoteData, query : dataQuery, value : 'EmployeeID', text : 'FirstName', hasChildren : 'EmployeeID',
    child: { dataSource: remoteData, query : childDataQuery, value : 'OrderID', text : 'ShipName', parentID : 'EmployeeID'}
  }
  let localData : object[] = [
    { id: '01', name: 'Local Disk (C:)',expanded: true,
    subChild: [
     { id: '01-01', name: 'Program Files',expanded: true,
     subChild: [
       { id: '01-01-01', name: '7-Zip' },
       { id: '01-01-02', name: 'Git' },
       { id: '01-01-03', name: 'IIS Express' }
     ]
     },
     { id: '01-02', name: 'Users',expanded: true,
     subChild: [
       { id: '01-02-01', name: 'Smith' },
       { id: '01-02-02', name: 'Admin' }
      ]
     },
     { id: '01-03', name: 'Windows',
     subChild: [
       { id: '01-03-01', name: 'FileManager' } 
      ]
     }
    ]
 },
 { id: '02', name: 'Local Disk (D:)',
    subChild: [
     { id: '02-01', name: 'Personals' },
     { id: '02-02', name: 'Projects' }
   ]
 },
 { id: '03', name: 'Local Disk (E:)',
    subChild: [
     { id: '03-01', name: 'Pictures' }, 
     { id: '03-02', name: 'Documents' } 
   ]
 }

  ];
  let fields : object = {
    dataSource : localData, value : 'id', text : 'name', child : 'subChild'
  }
  return (
    <div className="App">
      <DropDownTreeComponent fields={remoteDataFields} placeholder='Select a folder'
      popupHeight='200px' popupWidth='250px' allowMultiSelection={true}
      showCheckBox={true} treeSettings ={{autoCheck: true}}
      >

      </DropDownTreeComponent>
    </div>
  );
}

export default App;
