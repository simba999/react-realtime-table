import React from 'react';
import { createApolloFetch } from 'apollo-fetch';

import './index.css';

let NumberSettingData = {
  "data": {
    "allNumberSettings": [
      {
        "name": "สามหัว",
        "tabIndex": 1,
        "enter": true,
        "color": "#000",
        "numberType": "N3H",
        "id": "cjer508762hqs0167eprbfaid",
        "digit": 3,
        "defaultLimit": 1000,
        "list": true,
        "active": true
      },
      {
        "name": "สามท้าย",
        "tabIndex": 2,
        "enter": true,
        "color": "#000",
        "numberType": "N3T",
        "id": "cjer5189p2hr60167dik4qpt5",
        "digit": 3,
        "defaultLimit": 1000,
        "list": true,
        "active": true
      },
      {
        "name": "สามหัวท้าย",
        "tabIndex": 3,
        "enter": true,
        "color": "#000",
        "numberType": "N3HT",
        "id": "cjer554262hs30167zafeptdn",
        "digit": 3,
        "defaultLimit": 1000,
        "list": false,
        "active": true
      },
      {
        "name": "สองบน",
        "tabIndex": 4,
        "enter": true,
        "color": "#000",
        "numberType": "N2U",
        "id": "cjer59mr02hdd0172rsslidwd",
        "digit": 2,
        "defaultLimit": 5000,
        "list": true,
        "active": true
      },
      {
        "name": "สองล่าง",
        "tabIndex": 5,
        "enter": true,
        "color": "#000",
        "numberType": "N2B",
        "id": "cjer5acv72hdo01721ico4c6d",
        "digit": 2,
        "defaultLimit": 5000,
        "list": true,
        "active": true
      },
      {
        "name": "สองบนล่าง",
        "tabIndex": 6,
        "enter": true,
        "color": "#000",
        "numberType": "N2UB",
        "id": "cjer5awkb2hdu0172vkuo20kz",
        "digit": 2,
        "defaultLimit": 5000,
        "list": true,
        "active": true
      },
      {
        "name": "วิ่งบน",
        "tabIndex": 7,
        "enter": true,
        "color": "#000",
        "numberType": "N1TR",
        "id": "cjer5bo3d2he40172b9y9hlfs",
        "digit": 1,
        "defaultLimit": 10000,
        "list": false,
        "active": true
      },
      {
        "name": "วิ่งล่าง",
        "tabIndex": 8,
        "enter": true,
        "color": "#000",
        "numberType": "N1BR",
        "id": "cjer5ci6i2hul0167skf1h4q8",
        "digit": 1,
        "defaultLimit": 10000,
        "list": true,
        "active": true
      },
      {
        "name": "โต๊ดหัว",
        "tabIndex": 9,
        "enter": false,
        "color": "#000",
        "numberType": "NTH",
        "id": "cjer5db0v2hv6016757qlt999",
        "digit": 3,
        "defaultLimit": 1000,
        "list": true,
        "active": false
      },
      {
        "name": "โต๊ดท้าย",
        "tabIndex": 10,
        "enter": false,
        "color": "#000",
        "numberType": "NTT",
        "id": "cjer5dsoo2hfb01723efiin6x",
        "digit": 3,
        "defaultLimit": 1000,
        "list": true,
        "active": false
      }
    ]
  }
}


export default class CustomTable extends React.Component {
	constructor() {
		super();

		this.state = {
      orderList: {},              // Order data
			numberSetting: [],         // Number Setting data
      columnList: [],            // list which shows column data,
      currentColumnNumber: 0,       // current selected colunm number
      columCount: 0,               // count of displayed columns
      rowCount: 0,                  // count of displayed rows
      inputNumberType: '',          // value
      inputLottery: '',
      inputPrice: ''
		}

    this.changeValue = this.changeValue.bind(this);
    this.addData = this.addData.bind(this);
	}

	componentWillMount() {
    let columnList = [];
    let numberSetting = [];

    const fetch = createApolloFetch({
      uri: 'https://api.graph.cool/simple/v1/cjejed4se53oa0135znj1b9p5',
    });

    fetch({
      query: `query ListNumberSetting($first: Int, $skip: Int) {
        allNumberSettings(first: $first, skip: $skip) {
          id
          numberType
          name
          digit
          color
          defaultLimit
          tabIndex
          active
          list
          enter
        }
      }`,
      variables: { skip: 0 },
    }).then(res => {
      if (res.data) {
        let numberList = res.data.allNumberSettings;
        // numberList = NumberSettingData.data.allNumberSettings;
        numberList.map((item, key) => {
          let temp = {};
          numberSetting.push(item.numberType);
          
          if (item.list == true) {
            temp = item;
            temp.data = [];

            columnList.push(temp)
          }
        });
       
        this.setState({
          numberSetting: numberSetting,
          columnList: columnList,
          columCount: columnList.length
        });
      }
    });

    fetch({
      query: `query ListOrders ($first: Int, $skip: Int){ allOrders(first: $first, skip: $skip) { createdAt createdBy{ id email } numberType number value period{ id name } } }`
    }).then(res => {
      if (!res.errors) {
        let orders = res.data.allOrders;
        let orderList = {};

        orders.map((order) => {
          if (order.numberType) {
            if (!orderList[order.numberType]) {
              orderList[order.numberType] = [order];
            } else {
              let temp = Object.assign([], orderList[order.numberType]);
              temp.push(order);
              orderList[order.numberType] = temp;
            }
          }
        })

        this.setState({ orderList: orderList });
      }
    })

    // static data 
    // let numberList = NumberSettingData.data.allNumberSettings;
    //   numberList.map((item, key) => {
    //     let temp = {};
    //     numberSetting.push(item.numberType);
        
    //     if (item.list == true) {
    //       temp = item;
    //       temp.data = [];

    //       columnList.push(temp)
    //     }
    //   });
     
    //   this.setState({
    //     numberSetting: numberSetting,
    //     columnList: columnList,
    //     columCount: columnList.length
    //   });
	}

  componentDidMount() {
    const self = this;
    
    $(document).keypress(function(e) {
      if(e.which == 13) {
        // enter pressed
        if (e.target.id.indexOf('input') > -1) {
          self.addData();
        } else {
          let selector = '#colItem' + self.state.currentColumnNumber;

          // set class to outline the column
          $(selector).siblings().removeClass('active');
          $(selector).addClass('active');

          let curPage = self.state.currentColumnNumber + 1;

          if (curPage < self.state.columCount) {
            self.setState({ currentColumnNumber: self.state.currentColumnNumber + 1 })  
          } else {
            self.setState({ currentColumnNumber: 0 })
          }
        }
      } else {
        console.log('enter no response', event.which, event.type)
      }
    });
  }

  /*
  *   Validation function
  */
  addData(e) {
    const self = this;

    if (this.state.inputLottery == '') {
      $("#inputLottery").addClass('err-input');
    } else {
      $("#inputLottery").removeClass('err-input');
      if (this.state.inputPrice == '' || !this.isCustomValidator(this.state.inputPrice)) {
        $("#inputPrice").addClass('err-input');
      } else {
        $("#inputPrice").removeClass('err-input');

        const fetch = createApolloFetch({
          uri: 'https://api.graph.cool/simple/v1/cjejed4se53oa0135znj1b9p5',
        });
        
        fetch({
          query: `mutation CreateOrder(
            $number: String!
            $numberType: NumberType!
            $value: String!
            $createdById: ID!
            $customerIdId: ID!
            $periodId: ID!
          ){
            createOrder(
            number: $number
            numberType: $numberType
            value: $value
            createdById: $createdById
            customerIdId: $customerIdId
            periodId: $periodId
            ){
              id
            }
          }`,
          variables: {
            "number": self.state.inputLottery, 
            "numberType": self.state.inputNumberType, 
            "value": self.state.inputPrice, 
            "createdById": "cjer6fztmzy7q0129wt359yho", 
            "customerIdId": "cjer5ey2c2hfu0172wc7w3aks", 
            "periodId": "cjer5h4sl2hwu01674kzpm7bh"
          },
        }).then(res => {
          if (!res.errors) {
            let orders = res.data.createOrder;
            const temp = {
              id: orders.id,
              number: self.state.inputLottery,
              value: self.state.inputPrice,
              "createdById": "cjer6fztmzy7q0129wt359yho", 
              "customerIdId": "cjer5ey2c2hfu0172wc7w3aks", 
              "periodId": "cjer5h4sl2hwu01674kzpm7bh",
              "numberType": self.state.inputNumberType

            }
            
            let orderList = Object.assign({}, this.state.orderList);

            if (temp.numberType) {
              if (!orderList[temp.numberType]) {
                orderList[temp.numberType] = [temp];
              } else {
                let temp1 = Object.assign([], orderList[temp.numberType]);
                temp1.push(temp);
                orderList[temp.numberType] = temp1;
              }
            }

            this.setState({ orderList: orderList });
          }
        })
      }
    }    
  }

  isNumeric(value) {
    return /^-{0,1}\d+$/.test(value);
  }

  isCustomValidator(value) {
    return /^\d+(\.\d+)?\*?\d+(\.\d+)?$/.test(value)
  }

  /*
  * function which monitor chanages on input and validate its data
  */
  changeValue(e, stateName) {
    if (stateName == 'inputPrice') {
      this.setState({
        inputPrice: e.target.value
      })
    } else if (stateName == 'inputLottery') {
      if (this.isNumeric(e.target.value) || e.target.value == '') {
        this.setState({
          inputLottery: e.target.value
        });
      }
    }
  }

  changeNumberValue(e) {
    this.setState({ inputNumberType: e.target.value })
  }

	render() {
		let { columnList, orderList, rowCount } = this.state;
    let rowTotal = 0;

    // calulate the maximium row counts
    for (let idx in orderList) {
      let count = orderList[idx].length;
      if (rowTotal < count) {
        rowTotal = count;
      }
    }
    
    let showNumlist = [];
    let rand = Math.random();
    for (let i = 0; i < rowTotal; i++) {
      showNumlist.push(
        <div className="row-item" key={rand + i}>{i+1}</div>
      )
    }

		return (
      <div className="fluid-container center-box" id="customTable">
        {/* table start */}
        <div className="row">
          <div className="column">
            <div className="col-header">No.</div>
            {showNumlist}
          </div>
          {
            columnList.map((column, key) => {
              let output = []
              if (orderList[column.numberType]) {
                orderList[column.numberType].map((item, itemKey) => {
                  output.push(
                    <div className="row" key={itemKey}>
                      <div className="col-6 row-item border-right">{item.number}</div>
                      <div className="col-6 row-item no-padding">{item.value}</div>
                    </div>
                  )
                })

                rand = Math.random()
                if (orderList[column.numberType].length < rowTotal) {
                  let termination = rowTotal - orderList[column.numberType].length;
                  for (let i = 0; i < termination; i++) {
                    output.push(
                      <div className="row" key={rand + i}>
                        <div className="col-6 row-item border-right"></div>
                        <div className="col-6 row-item no-padding"></div>
                      </div>
                    )
                  }
                }
              } else {
                let termination = rowTotal
                rand = Math.random()
                for (let i = 0; i < termination; i++) {
                  output.push(
                    <div className="row" key={rand + i}>
                      <div className="col-6 row-item border-right"></div>
                      <div className="col-6 row-item no-padding"></div>
                    </div>
                  )
                }
              }

              return (
                <div className={"column col"} id={"colItem"+key} key={key}>
                  <div className="row col-header">
                    <div className="col-header-item color-sub-header">{column.numberType}</div>
                    <div className="col-header-item">
                      <div className="col-6">lottery</div>
                      <div className="col-6">price</div>
                    </div>
                  </div>
                  {
                    output
                  }
                  
                </div>
              )
            })
          }
        </div>
        {/* table end */}
        <div className="row footer">
          <div className="col-4">
            <input 
              type="text"
              id="inputNumberType"
              placeholder="Enter number type"
              value={this.state.inputNumberType}
              onChange={(e) => this.changeNumberValue(e)} />
          </div>
          <div className="col-4">
             <input 
              type="text"
              id="inputLottery"
              placeholder="Enter number type"
              value={this.state.inputLottery}
              onChange={(e) => this.changeValue(e, 'inputLottery')} />
          </div>
          <div className="col-4">
             <input 
              type="text"
              id="inputPrice"
              placeholder="Enter number type"
              value={this.state.inputPrice}
              onChange={(e) => this.changeValue(e, 'inputPrice')} />
          </div>
        </div>
      </div>
		)
	}
}