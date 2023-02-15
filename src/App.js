// import logo from './logo.svg';
// import './App.css';

import styled from "styled-components";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import TronWeb from "tronweb";

// import abiUSDT from "./jsonABI/abiUSDT";
// import abiContractTrade from "./jsonABI/abiContractTrade";

const App = () => {
  const [addressdeposit, setAddressdeposit] = useState(
    "THHA8dYpSzmcjAFe7dnc1g7Cvom8SPo8nN"
  );
  const [amountdeposit, setAmountdeposit] = useState(0);

  const [addressUSDTToken, setAddressUSDTToken] = useState(
    "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"
  );
  const [addressWithdrawTo, setAddressWithdrawTo] = useState();
  const [amountWithdraw, setAmountWithdraw] = useState(0);

  // const ServerNode = "https://api.trongrid.io";
  // const HttpProvider = TronWeb.providers.HttpProvider; // This provider is optional, you can just use a url for the nodes instead
  // const fullNode = new HttpProvider(ServerNode); // Full node http endpoint
  // const solidityNode = new HttpProvider(ServerNode); // Solidity node http endpoint
  // const eventServer = ServerNode; // Contract events http endpoint
  // const tronweb = new TronWeb(fullNode, solidityNode, eventServer);
  const tronweb = new TronWeb({
    fullNode: "https://api.trongrid.io",
    solidityNode: "https://api.trongrid.io",
  });

  const valueHex = (value) => {
    return "0x" + (value * 10 ** 6).toString(16);
  };

  const handleDeposit = async () => {
    try {
      const address = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"; //trx: TFUD8x3iAZ9dF7NDCGBtSjznemEomE5rP9   usdt: TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t
      tronweb.setAddress(address);
      const { abi } = await tronweb.trx.getContract(address);
      // console.log(JSON.stringify(abi));
      tronweb.contract(abi.entrys, address);

      let contractUSDT = await tronweb.contract().at(address);

      // console.log(contractUSDT);
      let resBalance = await contractUSDT.methods
        .balanceOf("TCjKz7ugqgV5Xxdd39yX78x6cWueAWsqE8")
        .call();
      console.log("balance:", parseInt(resBalance._hex));

      let response = await contractUSDT.methods
        .transfer(addressdeposit, valueHex(amountdeposit))
        .send();
      console.log("response", response);
      // await response.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const handleWithdraw = async () => {
    try {
      const address = "THHA8dYpSzmcjAFe7dnc1g7Cvom8SPo8nN";
      tronweb.setAddress(address);
      const { abi } = await tronweb.trx.getContract(address);

      const contractTrade = tronweb.contract(abi.entrys, address);
      let response = await contractTrade
        .withdrawTokens(
          addressUSDTToken,
          addressWithdrawTo,
          valueHex(amountWithdraw)
        )
        .send();

      console.log("response", response);
      // await response.wait();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledComponent>
      <TopNavBar></TopNavBar>
      <Content>
        <LeftPart>
          <TableBox01>
            <TopTitle01>
              <LeftText01>Deposit</LeftText01>
            </TopTitle01>
            <TableContent>
              <EachRow>
                <TextField
                  id="outlined-number"
                  label="To Address:"
                  fullWidth
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                  value={addressdeposit}
                  onChange={(e) => {
                    setAddressdeposit(e.target.value);
                  }}
                />
              </EachRow>
              <EachRow>
                <TextField
                  id="outlined-number"
                  label="deposit Amount:"
                  fullWidth
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={amountdeposit}
                  onChange={(e) => {
                    setAmountdeposit(e.target.value);
                  }}
                />
              </EachRow>
              <EachRow>
                <ButtonDeposit onClick={() => handleDeposit()}>
                  Deposit
                </ButtonDeposit>
              </EachRow>
            </TableContent>
          </TableBox01>
        </LeftPart>

        <RightPart>
          <TableBox02>
            <TopTitle02>
              <LeftText01>Withdraw</LeftText01>
            </TopTitle02>
            <TableContent>
              <EachRow>
                <TextField
                  id="outlined-number"
                  label="USDT Token Address:"
                  fullWidth
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                  value={addressUSDTToken}
                  onChange={(e) => {
                    setAddressUSDTToken(e.target.value);
                  }}
                />
              </EachRow>

              <EachRow>
                <TextField
                  id="outlined-number"
                  label="To Address:"
                  fullWidth
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={addressWithdrawTo}
                  onChange={(e) => {
                    setAddressWithdrawTo(e.target.value);
                  }}
                />
              </EachRow>

              <EachRow>
                <TextField
                  id="outlined-number"
                  label="Withdraw Amount:"
                  fullWidth
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={amountWithdraw}
                  onChange={(e) => {
                    setAmountWithdraw(e.target.value);
                  }}
                />
              </EachRow>
              <EachRow>
                <ButtonWithdraw onClick={() => handleWithdraw()}>
                  Withdraw
                </ButtonWithdraw>
              </EachRow>
            </TableContent>
          </TableBox02>
        </RightPart>
      </Content>
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0px 100px;
  box-sizing: border-box;
  flex-direction: column;
`;

const TopNavBar = styled(Box)`
  display: flex;
  width: 100%;
  height: 100px;
  align-items: center;
`;

const Content = styled(Box)`
  display: flex;
  width: 100%;
  margin-top: 50px;
  justify-content: space-between;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const LeftPart = styled(Box)`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const RightPart = styled(Box)`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const TableBox01 = styled(Box)`
  display: flex;
  width: 70%;
  flex-direction: column;
  border-radius: 8px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(35 55 80) 0px 6px 10px;
  @media (max-width: 1200px) {
    width: 70%;
  }
  @media (max-width: 1000px) {
    width: 85%;
  }
  transition: 0.5s;
  &:hover {
    box-shadow: rgb(14 114 53) 0px 10px 30px;
  }
`;

const TableBox02 = styled(Box)`
  display: flex;
  width: 70%;
  flex-direction: column;
  border-radius: 8px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(35 55 80) 0px 6px 10px;
  @media (max-width: 1200px) {
    width: 70%;
  }
  @media (max-width: 1000px) {
    width: 85%;
  }
  transition: 0.5s;
  &:hover {
    box-shadow: rgb(122 7 7) 0px 10px 30px;
  }
`;

const TopTitle01 = styled(Box)`
  display: flex;
  width: 100%;
  height: 80px;
  align-items: center;
  background-color: rgb(37 183 93);
  border-radius: 8px 8px 0px 0px;
  color: white;
  font-size: 2rem;
  font-weight: 600;
  font-family: "Changa One", sans-serif;
  @media (max-width: 1200px) {
    font-size: 1.7rem;
  }
  @media (max-width: 500px) {
    font-size: 1.5rem;
  }
`;

const TopTitle02 = styled(Box)`
  display: flex;
  width: 100%;
  height: 80px;
  align-items: center;
  background-color: rgb(213 48 48);
  border-radius: 8px 8px 0px 0px;
  color: white;
  font-size: 2rem;
  font-weight: 600;
  font-family: "Changa One", sans-serif;
  @media (max-width: 1200px) {
    font-size: 1.7rem;
  }
  @media (max-width: 500px) {
    font-size: 1.5rem;
  }
`;

const LeftText01 = styled(Box)`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  margin-left: 3%;
  @media (max-width: 1200px) {
    font-size: 1.7rem;
  }
  @media (max-width: 500px) {
    font-size: 1.5rem;
  }
`;

// const RightText01 = styled(Box)`
//   display: flex;
//   flex: 1;
//   justify-content: flex-end;
//   margin-right: 3%;
// `;

const TableContent = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  box-sizing: border-box;
`;

// const TextSubject = styled(Box)`
//   display: flex;
//   width: 100%;
//   width: 90%;
//   font-size: 1.3rem;
//   font-weight: 600;
//   color: rgb(84 84 84);
//   font-family: "Changa One", sans-serif;
//   &:hover {
//     cursor: pointer;
//     transition: 0.3s;
//     color: rgb(247 148 31);
//   }
//   @media (max-width: 1200px) {
//     font-size: 1.2rem;
//   }
//   @media (max-width: 900px) {
//     font-size: 1.3rem;
//   }
//   @media (max-width: 500px) {
//     font-size: 1rem;
//   }
// `;

const EachRow = styled(Box)`
  display: flex;
  width: 100%;
  margin-top: 30px;
`;

const ButtonDeposit = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  width: 100%;
  height: 60px;
  background-color: rgb(37 183 93);
  color: white;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  transition: 0.3s;
  &:hover {
    text-shadow: 0px 0px 10px white;
  }
`;

const ButtonWithdraw = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  width: 100%;
  height: 60px;
  background-color: rgb(213 48 48);
  color: white;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  transition: 0.3s;
  &:hover {
    text-shadow: 0px 0px 10px white;
  }
`;

export default App;
