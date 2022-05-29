import React, { useState , useEffect} from 'react'
import { ethers } from 'ethers'

const Ether = () => {
    const [haveMetamask, setHaveMetamask] = useState(true)
    const [accountAddress, setAccountAddress] = useState("");
    const [accountBalance, setAccountBalance] = useState("")
    const [isConnected, setIsConnected] = useState(false)

    const {ethereum} = window
    // const provider = new ethers.provider.Web3Provider(window.ethereum)
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    useEffect(() => {
        const {ethereum} = window
        const checkMetamaskAvailability = async() => {
            if(!ethereum){
                setHaveMetamask(false)
            } 
            setHaveMetamask(true)
        }
        checkMetamaskAvailability()
    }, [])
    
    const connectWallet = async() => {
        try {
            if(!ethereum){
                setHaveMetamask(true)
            }
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts'
            })
            let balance = await provider.getBalance(accounts[0])
            let bal = ethers.utils.formatEther(balance)

            setAccountAddress( accounts[0]);
            setAccountBalance(bal);
            setIsConnected(true);

        } catch (error) {
            setIsConnected(false)
        }

    }
  return (
    <main>
      {/* <p className="hidden md:block border border-purple-600 text-purple-800 px-5 hover:ease-in-out duration-150 py-2 rounded-full transform hover:scale-105 cursor-pointer">
        Connect Wallet
      </p> */}
      <header className="App-header">
        {haveMetamask ? (
          <div className="App-header">
            {isConnected ? (
              <div className="card">
                <div className="card-row">
                  {/* <h3>Wallet Address:</h3> */}
                  <p>
                    {accountAddress.slice(0, 4)}...
                    {accountAddress.slice(38, 42)}
                  </p>
                </div>
                <div className="card-row">
                  {/* <h3>Wallet Balance:</h3> */}
                  {/* <p>{accountBalance}</p> */}
                </div>
              </div>
            ) : (
              //   <img src={logo} className="App-logo" alt="logo" />
              <h1 className="hidden">12</h1>
            )}

            {isConnected ? (
              <p className="hidden">🎉 Connected Successfully</p>
            ) : (
              <button
                className="hidden md:block border border-purple-600 text-purple-800 px-5 hover:ease-in-out duration-150 py-2 text-sm rounded-full transform hover:scale-105 cursor-pointer"
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            )}
          </div>
        ) : (
          <p>Please Install MataMask</p>
        )}
      </header>
    </main>
  );
}

export default Ether