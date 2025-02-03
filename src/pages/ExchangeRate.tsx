import React, {useState, useEffect} from "react";

type exchange_rate = {
    yourPay: string,
    yourReceive: string,
    oneRate:  number,
    total : number,
    date?: Date 
}

type currency_rate = {
    "currency": string,
    "date":  Date,
    "price": number
  }

const ExchangeRate: React.FC = () => {
    const [amount, setAmount] = useState<number>(500)
    const [yourPay, setYourPay] = useState<string>("USD")
    const [yourReceive, setYourReceive] = useState<string>("BLUR")
    const [usingRate, setUsingRate] = useState<string>('Cash')
    const [resultExchange, setResultExchange] = useState<exchange_rate>({
            yourPay: '',
            yourReceive: '' ,
            oneRate:  0,
            total : 0,
            date: new Date()
    })

    const [errors, setErrors] = useState<{ amount?: string; yourPay?: string; yourReceive?: string }>({});

    
  const listCurency = [
    {
      "currency": "BLUR",
      "date": "2023-08-29T07:10:40.000Z",
      "price": 0.208115254237288
    },
    {
      "currency": "bNEO",
      "date": "2023-08-29T07:10:50.000Z",
      "price": 7.1282679
    },
    {
      "currency": "BUSD",
      "date": "2023-08-29T07:10:40.000Z",
      "price": 0.999183113
    },
    {
      "currency": "USD",
      "date": "2023-08-29T07:10:30.000Z",
      "price": 1
    },
    {
      "currency": "ETH",
      "date": "2023-08-29T07:10:52.000Z",
      "price": 1645.93373737374
    },
    {
      "currency": "GMX",
      "date": "2023-08-29T07:10:40.000Z",
      "price": 36.3451143728814
    },
    {
      "currency": "STEVMOS",
      "date": "2023-08-29T07:10:40.000Z",
      "price": 0.0727670677966102
    },
    {
      "currency": "LUNA",
      "date": "2023-08-29T07:10:40.000Z",
      "price": 0.409556389830508
    },
    {
      "currency": "RATOM",
      "date": "2023-08-29T07:10:40.000Z",
      "price": 10.2509189152542
    },
    {
      "currency": "STRD",
      "date": "2023-08-29T07:10:40.000Z",
      "price": 0.738655338983051
    },
    {
      "currency": "EVMOS",
      "date": "2023-08-29T07:10:40.000Z",
      "price": 0.062461813559322
    },
    {
      "currency": "IBCX",
      "date": "2023-08-29T07:10:40.000Z",
      "price": 41.268113559322
    },
    {
      "currency": "IRIS",
      "date": "2023-08-29T07:10:40.000Z",
      "price": 0.0177095593220339
    },
    {
      "currency": "ampLUNA",
      "date": "2023-08-29T07:10:40.000Z",
      "price": 0.495485898305085
    },
    {
      "currency": "KUJI",
      "date": "2023-08-29T07:10:45.000Z",
      "price": 0.675
    },
    {
      "currency": "STOSMO",
      "date": "2023-08-29T07:10:45.000Z",
      "price": 0.431318
    },
    {
      "currency": "USDC",
      "date": "2023-08-29T07:10:40.000Z",
      "price": 0.989832
    },
    {
      "currency": "axlUSDC",
      "date": "2023-08-29T07:10:40.000Z",
      "price": 0.989832
    },
    {
      "currency": "ATOM",
      "date": "2023-08-29T07:10:50.000Z",
      "price": 7.18665733333333
    },
    {
      "currency": "STATOM",
      "date": "2023-08-29T07:10:45.000Z",
      "price": 8.51216205084746
    },
    {
      "currency": "OSMO",
      "date": "2023-08-29T07:10:50.000Z",
      "price": 0.377297433333333
    },
    {
      "currency": "rSWTH",
      "date": "2023-08-29T07:10:40.000Z",
      "price": 0.00408771
    },
    {
      "currency": "STLUNA",
      "date": "2023-08-29T07:10:40.000Z",
      "price": 0.442322101694915
    },
    {
      "currency": "LSI",
      "date": "2023-08-29T07:10:50.000Z",
      "price": 67.6966152542373
    },
    {
      "currency": "OKB",
      "date": "2023-08-29T07:10:40.000Z",
      "price": 42.9756205932203
    },
    {
      "currency": "OKT",
      "date": "2023-08-29T07:10:40.000Z",
      "price": 13.5615779661017
    },
    {
      "currency": "SWTH",
      "date": "2023-08-29T07:10:45.000Z",
      "price": 0.00403985045501208
    },
    {
      "currency": "USC",
      "date": "2023-08-29T07:10:40.000Z",
      "price": 0.994
    },
    {
      "currency": "USDC",
      "date": "2023-08-29T07:10:30.000Z",
      "price": 1
    },
    {
      "currency": "USDC",
      "date": "2023-08-29T07:10:30.000Z",
      "price": 1
    },
    {
      "currency": "USDC",
      "date": "2023-08-29T07:10:40.000Z",
      "price": 0.999878261118644
    },
    {
      "currency": "WBTC",
      "date": "2023-08-29T07:10:52.000Z",
      "price": 26002.822020202
    },
    {
      "currency": "wstETH",
      "date": "2023-08-29T07:10:40.000Z",
      "price": 1872.25797423729
    },
    {
      "currency": "YieldUSD",
      "date": "2023-08-29T07:10:40.000Z",
      "price": 1.02908479661017
    },
    {
      "currency": "ZIL",
      "date": "2023-08-29T07:10:50.000Z",
      "price": 0.0165181355932203
    }
  ]

  useEffect(() => {
    exchangeRate()
  },[])
  ////////////////////////////
  const amountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)  => {
    const value:number = parseFloat(e.target.value);
    if (isNaN(value) || value <= 0) {
      setErrors((prev) => ({ ...prev, amount: "Amount must be greater than 0" }));
      setAmount(0);
    } else {
      setErrors((prev) => ({ ...prev, amount: undefined  }));
      setAmount(value);
    }
  }

  ////////////////////////////
  const yourPayChange = <T extends HTMLInputElement | HTMLSelectElement>(e: React.ChangeEvent<T>) => {
    setYourPay(e.target.value)
    if (e.target.value === yourReceive) {
      setErrors((prev) => ({ ...prev, yourPay: "Currency must be different from receiving currency" }));
    } else {
      setErrors((prev) => ({ ...prev, yourPay: '', yourReceive: undefined  }));
    }
  }

  ////////////////////////////
  const yourReceiveChange = <T extends HTMLInputElement | HTMLSelectElement>(e: React.ChangeEvent<T>) => {
    setYourReceive(e.target.value)
    if (e.target.value === yourPay) {
      setErrors((prev) => ({ ...prev, yourReceive: "Currency must be different from paying currency" }));
    } else {
      setErrors((prev) => ({ ...prev, yourPay: '', yourReceive: undefined  }));
    }
  }
  ////////////////////////////
  const exchangeRate =() => {
    let found_your_pay: Partial<currency_rate> = {};
    let foundItem = listCurency.find(item => item.currency === yourPay);

    if (foundItem) {
      found_your_pay = {
        ...foundItem,
        date: new Date(foundItem.date), 
      };
    }
      
    let found_your_receive : Partial<currency_rate> = {};
    foundItem = listCurency.find(item => item.currency === yourReceive);
    if (foundItem) {
      found_your_receive = {
        ...foundItem,
        date: new Date(foundItem.date), 
      };
    }
    
    let recevied:number =0
    if(found_your_pay !==undefined && found_your_receive !==undefined && amount >0 && found_your_receive?.price !==undefined && found_your_receive?.price >0){
       recevied = (found_your_pay?.price || 0 )/ found_your_receive?.price
    }


    const exchange_result: exchange_rate = {
        yourPay: yourPay,
        yourReceive: yourReceive,
        oneRate:  recevied,
        total : recevied * amount,
        date: found_your_receive?.date
      };

      if (recevied > 0 && typeof amount === "number") {
        setResultExchange(exchange_result);
      } else {
        console.error("Invalid data: received or amount is not a number");
      }
  }

  const submitExchangeRate =(e: React.MouseEvent<HTMLButtonElement>)  => {
    e.preventDefault()
    const newErrors: { amount?: string; yourPay?: string; yourReceive?: string } = {};

    if (amount <= 0 || isNaN(amount)) {
      newErrors.amount = "Amount must be greater than 0";
    }
    
    if (!yourPay) {
      newErrors.yourPay = "Select a currency to pay";
    }
    
    if (!yourReceive) {
      newErrors.yourReceive = "Select a currency to receive";
    }

    if (yourPay === yourReceive) {
      newErrors.yourReceive = "Currency must be different from paying currency";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      exchangeRate();
    }
    
  }
    /////////////////////////////////////////
    return (
      <div className="c-666 font-serif">
       <div className="min-h-screen w-screen py-12 px-16 md:py-20 md:px-[150px]">
          <div className="mb-16 ">
            <h1 className="text-5xl c-666 font-serif">Currency converter</h1>
          </div>
          <div className="mb-16">
            <h4 className="text-2xl font-mono text-gray-950  c-666 font-serif">Convert from one currency to another with our easy-to-use currency calculator tool.</h4>
          </div>
    
          
          <div className="bg-ededed py-6 px-6 ms:py-12 ms:px-16 md:py-12 md:px-16 rounded-lg">
            <h3 className="text-5xl font-serif py-6">Exchange rates</h3>
            <p className="text-gray-700 pb-6">Enter the amount of money and the currency you wish to exchange to.</p>
            <div className="grid grid-cols-2 w-full">
              <div className="pr-4  w-full h-full border-e">            
                <form className="w-full ">
                  <label className="block text-gray-700   mb-2" htmlFor="amount">
                    <p className="">Enter amount</p>
                    <p>Enter a value between between 1 and 999,999,999,999,999</p>
                  </label>
                  <input
                    type="number"
                    id="amount"
                    placeholder="500"
                    className={`w-full bg-white p-3 border ${errors.amount ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    value={amount}
                    onChange={e=>amountChange(e)}
    
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-"].includes(e.key)) {
                        e.preventDefault(); // Prevent non-numeric characters
                      }
                    }}
                  />
                  {errors.amount && <p className="text-red-500">{errors.amount}</p>}

                   <label className="block text-gray-700   mb-2 mt-8" htmlFor="exchane_form">
                    <p className="">Exchange from</p>
                    <p>You pay</p>
                  </label>
                  <select id="exchane_form" 
                  className={`w-full p-3 border ${errors.yourPay ? "border-red-500" : "border-gray-300"} bg-white text-gray-90 focus:outline-none focus:ring-2 focus:ring-blue-500` }                  
                  value={yourPay} onChange={e=>yourPayChange(e)}
                  >
                  {
                    listCurency.length && (
                      listCurency.map((item, index)=> (
                        <option value={item.currency} key = {`currency-${index}`}>{item.currency}</option>
                      ))
                    )
                  }
                    
                  </select>
                  {errors.yourPay && <p className="text-red-500">{errors.yourPay}</p>}

                  <label className="block text-gray-700   mb-2 mt-8" htmlFor="convert_to">
                    <p className="">Convert to</p>
                    <p>You receive</p>
                  </label>
                  <select id="convert_to" 
                  className={`w-full p-3 border ${errors.yourReceive ? "border-red-500" : "border-gray-300"} bg-white text-gray-90 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  value={yourReceive} onChange={e => yourReceiveChange(e)}
                  >
                  {
                    listCurency.length && (
                      listCurency.map((item, index)=> (
                        <option value={item.currency} key = {`currency1-${index}`}>{item.currency}</option>
                      ))
                    )
                  }
                  </select>
                  {errors.yourReceive && <p className="text-red-500">{errors.yourReceive}</p>}
                  
                  <label className="block text-gray-700   mb-2 mt-8" htmlFor="using_rate_of">
                    <p className="">Using rate of</p>
                    <p>Please choose the conversion rate</p>
                  </label>
                  <select id="using_rate_of" className="w-full p-3 border border-gray-300 bg-white text-gray-90 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="cash">Cash</option>
                  </select>
    
                  <button type="button" className="bg-transparent bg-transparent-cus  w-full mt-8"
                    onClick={submitExchangeRate}
                  >SUBMIT</button>
          
    
                </form>
              </div>
              <div className="pl-4 w-full h-full ">
               <p className="font-bold">Summary</p>
               <p className="mt-6">Exchange rate</p>
               <p className="text-3xl">{resultExchange?.yourPay} 1 = {resultExchange?.oneRate}</p>
               <p className="mt-8">You pay</p>
               <p className="text-3xl">{resultExchange?.yourPay} {amount}</p>
               <p className="mt-8">You receive</p>
               <p className="text-3xl"> {resultExchange?.yourReceive} {resultExchange?.total}</p>
               <p className="mt-8">Updated at: {resultExchange.date?.toLocaleString() ?? ""}</p>
              </div>
            </div>
    
           
          </div>
          <p className="mt-4 mb-2">1. The above rates are for reference only. When markets are closed, transactions may also carry higher risk margins.</p>
          <p className="mb-2">2. Please call our Contact Center at (84 28) 00 00 00 (the South) or (84 24) 62 000 000 (the North) for the latest rates.</p>
          <p className="mb-2">3. The Calculator and Exchange Rates are for reference only.</p>
          <p className="mb-2">4. The above rates are subject to change during the course of the day without prior notice.</p>
          <p className="mb-4">5.  For business customers, please contact your Relationship Manager for the exchange rates or commercial banking charges.</p>
          
    
        </div>     
    
      </div>
      );

 
  };  
  
  export default ExchangeRate;
 