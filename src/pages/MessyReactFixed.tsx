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

    5/This is my Fixed    
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

      //filter((balance) => balance.priority > -99 && balance.amount > 0). get correct balanace
      //sort((a, b) => b.priority - a.priority) // sort in descending order 
      const sortedBalances = useMemo(() => {
        return balances.map((balance) => ({
            ...balance,            
            formatted: balance.amount.toFixed(),
            priority: getPriority(balance.blockchain)
          }))
          .filter((balance) => balance.priority > -99 && balance.amount > 0) 
          .sort((leftPriority, rightPriority) => rightPriority.priority - leftPriority.priority)
      }, [balances]);
  
    return (
      <div {...rest}>
      {sortedBalances.length > 0 && (sortedBalances.map((balance) => (
        <WalletRow
          className={classes.row}
          key={balance.currency}
          amount={balance.amount}
          usdValue={(prices[balance.currency] ?? 0) * balance.amount}
          formattedAmount={balance.formatted}
        />
      )))}
    </div>
    )
  }

