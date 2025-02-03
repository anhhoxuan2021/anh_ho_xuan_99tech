import React from "react";
//import { Link } from "react-router-dom";

const Threewaystosumton: React.FC = () => {
  //////////////////F1
  const sum_to_n_a  = (n: number) => {
    let sum: number=0;
    for(let i:number=1; i< 6; i ++) {
      sum +=i
    }

    return sum
  }
 //////////////////F2
  const sum_to_n_b  = (n: number)=> {
    return([...Array(n).keys()].map(i => i + 1).reduce((sum, num) => sum + num, 0)
  }
 //////////////////F3
  const sum_to_n_c = (n: number) => {
    return (n * (n + 1)) / 2;
  }
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    </div>
  );
};

export default Threewaystosumton;