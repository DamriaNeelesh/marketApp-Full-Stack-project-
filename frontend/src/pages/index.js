// import axios from "axios";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

const Index = ({userList}) => {
  const [total, setTotal] = useState(1000)
  // const [quantity, setQuantity] = useState(0.00)
  const [loaded,setLoaded]=useState(false);
  const [value,setValue]=useState(0);
  const [submitted, setSubmitted]=useState(false)  // when the cart is submitted it will be true
  // const [apiData, setApiData] = useState(userList);
  const [tempVal,setTempVal]=useState(0.00);
  const [inputValues,setInputValues] = useState(0);
  const handleSubmit = ()  => {
    if(value != 0) {
      Swal.fire("Order Success", `Total order price : ${value}`);
      setSubmitted(true);
      refresh()
    }
    else{
      Swal.fire('Please add items');
    }
  };

  // const handleInputChange = (event)=>{
  //   const {val} = event.target;
  //   setInputValues({...inputValues,val});
  // }

  const addToCart = (price,quantity) => {
    // const q=quantity.parseFloat(2);
    if (price*quantity<= total && quantity!=0) {
      console.log(price*quantity)
      setValue(price*quantity)
      setTotal(total-price*quantity);
      setInputValues(0)
      // setCount = setCount + 1;
      Swal.fire(
        'Added to Cart Successfully!',
        'Bitcoin added',
        'success'
      )
    }else if(price*quantity==0){
      Swal.fire(
        'Error',
        'Please add the quantity',
        'error'
      )
    }else{
      Swal.fire(
        'Insufficient Balance',
        'Bitcoin not added',
        'warning'
      )
    }
  }

  const [inputted,setInput]=useState(0);
  

  useEffect(() => {
    console.log(userList);
    setLoaded(true);
  },[]);

 

  const refresh = () => {
    window.location.reload(false)
  }

  return (
    <div style={{margin:20}}>
    <div>
      <label htmlFor="input" />
    {/* <input type='number' step="0.01" placeholder="0" onKeyDown={print} value={(event) => event.key} /> */}
    <h2 style={{textAlign:'center'}}>Stock Market Bitcoin Data</h2>
    <h3 style={{textAlign:'center'}}>Total Wallet Remaining: {total}</h3>
    </div>
   <div className="container"> 
   <button onClick={() => refresh()} style={{width:'120px', height:'30px'}}>Refresh</button>
   {/* style={{display:'flex',flexDirection:'row'}} */}
    <div className="leftSide">
    <table border="3" style={{padding:'10px', width:'100%'}}>
      <thead>
        <tr>
        <th width="10%">Sr No.</th>
        <th width="15%">Slug</th>
        <th width="15%">Symbol</th>
        <th width="20%">Price in USD</th>
        <th width="15%">Quantity</th>
        <th width="25%">Purchase</th>
        </tr>
      </thead>
      <tbody>
        {userList && userList.data.map((x,i)=> {
          
            return (
                <tr key={i}>
        <td>{i+1}</td>
        <td>{x.slug}</td>
        <td>{x.symbol}</td>
        <td>{(x.metrics.market_data.price_usd).toFixed(2)}</td>
        <td><input type='text'
                   id="value"
                   name={`${i}`}
                   onChange={event => {
                    setTempVal(event.target.value)
                   }}
                   autoComplete="off"
                   placeholder="0" />
        </td>
        <td style={{textAlign:"center"}}>
          <button onClick={() => {
          addToCart(x.metrics.market_data.price_usd,tempVal)
          setTempVal(0.00);
          }}
          > Add to cart </button>
        </td>
        </tr>
            );
          })}
      </tbody>
    </table>
    </div>
    <div className="rightSide">
      
      <div className="cart" style={{border:'2px solid black', padding:'10px'}}>
        <h4>Total Amount:{1000 - total}</h4>
        <button onClick={() => handleSubmit()}>Place Order</button>

      </div>
    </div>

  </div>
  </div> 
  )
}


// Index.getInitialProps = async () => {
//   const { data } = await axios.get('https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd');
//   // console.log(data);
//   return { userList:data}
// }


export async function getServerSideProps() {
  const res=await fetch('http://localhost:3000/api');
  const userList=await res.json();
  return {
    props: {userList}
  }
} 



export default Index;

/*
a": [
        {
            "id": "1e31218a-e44e-4285-820c-8282ee222035",
            "slug": "bitcoin",
            "symbol": "BTC",
            "metrics": {
                "market_data": {
                    "price_usd": 24790.86118686957
                }
            }
        },
*/