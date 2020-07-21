# BAND

Irisnet-crypto has completed the docking cosmos main network(chain-id:band-wenchang-testnet),supports signing for the following transactions

- Transfer
- Delegate
- Undelegate
- Redelegate
- SetWithdrawAddress
- WithdrawDelegationReward
- WithdrawValidatorCommission

Construct a valid transaction that requires user to construct the following transaction request:

```json
{
  "chain_id": "",
  "from": "",
  "account_number": 0,
  "sequence": 0,
  "fees": { "denom": "uband", "amount": 100 },
  "gas": 10000,
  "memo": "",
  "type": "",
  "msg": msg
}
```

The parameters are as follows:

- chain_id : blockchain's chain_id
- from : Signer's address of the transaction
- account_number : you can get it from lcd api "/auth/accounts/"
- sequence : you can get it from lcd api "/auth/accounts/"
- fees : transaction fee
- gas : gas limit
- memo : transaction description(Up to 100 characters)
- type : transaction type,enumeration values are as follows
  - transfer
  - delegate
  - undelegate
  - begin_redelegate
  - set_withdraw_address
  - withdraw_delegation_reward
  - withdraw_validator_commission
- msg : the specific transaction content, different type of transaction has different structure. For details, please refer to the following example.

  - Transfer

    ```json
    {
      "to": "band18d26ynxg4pcwezrq44jl552ugxla523zv93paj",
      "coins": [
        {
          "denom": "uband",
          "amount": 1000
        }
      ]
    }
    ```

  - delegate

    ```json
    {
      "validator_addr": "bandvaloper1r00x80djyu6wkxpceegmvn5w9nx65prgqhxkzq",
      "amount": {
        "denom": "uband",
        "amount": "10"
      }
    }
    ```

  - undelegate

    ```json
    {
      "validator_addr": "bandvaloper1r00x80djyu6wkxpceegmvn5w9nx65prgqhxkzq",
      "amount": {
        "denom": "uband",
        "amount": "10"
      }
    }
    ```

  - begin_redelegate

    ```json
    {
      "validator_src_addr": "bandvaloper1r00x80djyu6wkxpceegmvn5w9nx65prgqhxkzq",
      "validator_dst_addr": "bandvaloper1r00x80djyu6wkxpceegmvn5w9nx65prgqhxkzq",
      "amount": {
        "denom": "uband",
        "amount": "2"
      }
    }
    ```

  - set_withdraw_address

    ```json
    {
      "withdraw_addr": "bandvaloper1r00x80djyu6wkxpceegmvn5w9nx65prgqhxkzq"
    }
    ```

  - withdraw_delegation_reward
    ```json
    {
      "validator_addr": "bandvaloper1r00x80djyu6wkxpceegmvn5w9nx65prgqhxkzq"
    }
    ```
  - withdraw_validator_commission(don't need)

When you have constructed the request parameters, you can call crypto's signature method.

1. Import the crypto library
   ```js
   import Irisnet from "irisnet-crypto";
   ```
2. Get transaction builder

   ```js
   let builder = Irisnet.getBuilder("band");
   ```

   _getBuilder_ has one parameter,used to specify which blockchain transaction to construct,we choose 'band'

3. Construct and sign a transaction

   ```js
   let stdTx = builder.buildAndSignTx(request, privateKey);
   ```

   _buildAndSignTx_ has two parameters:

   - request : first mentioned above
   - privateKey : your private key

4. Get the signed transaction content

   ```js
   let postTx = stdTx.GetData();
   ```

   _GetData_ will return the signed transaction (json format), you can submit it to the '/txs' api of LCD in post mode.

5. When request the server times out, you may not get any response. You can call the _Hash_ method to get the transaction hash, and go to the server to check the transaction result.
   `js let hash = stdTx.Hash();`
   Quick start please refer to [test case](../test/test_tx_cosmos.js)
