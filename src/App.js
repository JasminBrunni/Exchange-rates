
import './App.css';
import {useState} from 'react';

const URL='http://api.exchangeratesapi.io/v1/latest?access_key=';
const API_KEY ='4269d7fc54890fd4e5bff14f145f9778';

function App() {

  const [eur,setEur] = useState(0);
  const [gbp,setGbp] = useState(0);
  const [rate,setRate] = useState(0);

  async function convert(e) {
    e.preventDefault();
    try{
      const address = URL + API_KEY;
      const response = await fetch(address);

      if (response.ok){
        const json = await response.json();
        console.log(json.rates.GBP);
        setRate(json.rates.GBP);

        setGbp(eur * json.rates.GBP);
      } else {
        alert('Error retrieving exhange rate.');
        console.log(response);
      }
    } catch (err) {
      alert (err);
    }
  }

  return (
    <div id="container">
      <form onSubmit={convert}>
        <div id="otsikko">
          <h1>Exchange rates</h1>
          </div>
        <div id="euro">
          <label>Eur</label>&nbsp;
          <input type="number" step="0.01"
            value={eur} onChange={e => setEur(e.target.value)}/>
          <output> {rate}</output>
        </div>
        <div id="euro">
          <label>Gbp </label>
          <output>{gbp.toFixed(2)} € </output>
        </div>
        <div id="euro">
          <button>Calculate</button>
        </div>
      </form>
      
    </div>
  );
}

export default App;
