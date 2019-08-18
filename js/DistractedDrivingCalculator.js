class DistractedDrivingCalculator extends React.Component {

  //
  constructor(props) {
    super(props);
    this.state = {
      offences: 0,
      total: 0,
      reveal: 'hide'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    this.setState({
      offences: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  // render to HTML
  render() {

    var { name, premiums, fine } = this.props;
    var { offences, total, reveal } = this.state;
    
    return (
      <div className="distractedDrivingCalculator columns">
        <div className="column is-two-thirds left">
          <h3 className="title is-4">{name}</h3>
            <div className="field">
              <label class="label">Number of Offences in 12 months</label>
              <p className="control">
                <input className="input" type="number" placeholder={offences} onChange={this.handleChange}></input>
              </p>
            </div>
            <p className="field">Current Fine in BC: <strong>${fine}</strong></p>
            <p className="field">Number of Penalty Premium Points per Offence: <strong>{premiums}</strong></p>
            <div className="field">
              <p className="control">
                <button className="button is-primary" onClick={this.calculateFineTotal.bind(this)}>How much do I owe?</button>
              </p>
            </div>  
        </div>
        <div className="column is-one-third right">
          <div className="field total">
            <div className={reveal}>
               <h3 className="title is-4">You would have to pay:</h3>
              <h3 className="fine">${total}</h3>
            </div>
          </div>
        </div>
      </div>
    );

  }

  //
  calculateFineTotal() {
    var offences = parseInt(this.state.offences);
    var penalties = this.getPremiumPenaltyPoints(offences*4);
    var fine =  offences > 0 ? this.props.fine*offences: 0;

    this.setState({
      total: fine + penalties,
      reveal: 'reveal'
    });
  }

  //
  getPremiumPenaltyPoints(number) {
    var numberOfOffences = number < 50 ? number: 50;
    var penaltyPremiumPoints = { 
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 175,
      5: 230,
      6: 300,
      7: 415,
      8: 520,
      9: 640,
      10: 905,
      11: 1080,
      12: 1260,
      13: 1680,
      14: 1920,
      15: 2160,
      16: 2480,
      17: 2800,
      18: 3120,
      19: 3440,
      20: 3760,
      21: 4160,
      22: 4560,
      23: 4960,
      24: 5360,
      25: 5760,
      26: 6240,
      27: 6720,
      28: 7200,
      29: 7680,
      30: 8160,
      31: 8720,
      32: 9280,
      33: 9840,
      34: 10480,
      35: 11120,
      36: 11760,
      37: 12400,
      38: 13040,
      39: 13680,
      40: 14560,
      41: 15360,
      42: 16160,
      43: 16960,
      44: 17760,
      45: 18560,
      46: 19520,
      47: 20480,
      48: 21440,
      49: 22400,
      50: 24000
    };
    return penaltyPremiumPoints[numberOfOffences];
  }

}

// load the DistractedDrivingCalculator with props
// and apply render to the element with id="app"
ReactDOM.render( 
  <DistractedDrivingCalculator 
    name="Find Out How Much You Owe" 
    offences={0}
    premiums={4} 
    fine={368} />,
    document.getElementById('app')
);