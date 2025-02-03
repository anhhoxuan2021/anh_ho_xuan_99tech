  ///////////////These are errors in your code
  /*
  1/useMemo in sortedBalances function:
        -prices is redundant: prices does not use in sortedBalances function, so You include it  in the dependency array,
        that causes unnecessary recomputation

   2/ sortedBalances function:   
        if (lhsPriority > -99) {
               if (balance.amount <= 0) {
                 return true;     
               }
            }  

       -lhsPriorityis undefined.
       - Nested if statement. can change it like that: if ((lhsPriority > -99) &&  (balance.amount <= 0))
       - Filtering balances with amount <= 0  inside the wrong block. It's never execute
       - call multiple times getPriority function for each item
       - missing return 0 when leftPriority and rightPriority are equal
    3/   formattedBalances function:
       don't use a map in formattedBalances function, because it is just adding a formatted. Should combine 'formatted' in map iteration in sortedBalances function
    4/ don't use index as Key
        because balance.currency is unique. so You shoud use it as key. change like  that key={balance.currency}
  */

interface WalletBalance {
    currency: string;
    amount: number;
  }
  interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
  }
  
  interface Props extends BoxProps {
  
  }
  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();
  
      const getPriority = (blockchain: any): number => {
        switch (blockchain) {
          case 'Osmosis':
            return 100
          case 'Ethereum':
            return 50
          case 'Arbitrum':
            return 30
          case 'Zilliqa':
            return 20
          case 'Neo':
            return 20
          default:
            return -99
        }
      }
  
    const sortedBalances = useMemo(() => {
      return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);

            //lhsPriority. what is lhsPriority?  lhsPriority is undefined
            //Inverted logic
            //no need nest Nested if statement
            if (lhsPriority > -99) {
               if (balance.amount <= 0) {
                 return true;     
               }
            }
            return false
          }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
              const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            if (leftPriority > rightPriority) {
              return -1;
            } else if (rightPriority > leftPriority) {
              return 1;
            }
      });
    }, [balances, prices]);   //prices is redundant
  
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed()
      }
    })
  
    const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow 
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    })
  
    return (
      <div {...rest}>
        {rows}
      </div>
    )
  }

