const Irisnet = require('../index');
const common = require('./common');
const chai = require('chai');
const delay = require('delay');
const assert = chai.assert;

const host = 'http://wenchang-testnet2-alice.node.bandchain.org:1317';
const url = host + '/txs';

describe('band transaction', function() {
  let chain_id = 'band-wenchang-testnet2';
  let from = 'band135egpku8xk4swnjdg2aqhgddd0l3evscnuwcdl';
  let gas = 200000;
  let account_number = 527;
  let fees = {denom: 'uband', amount: '10'};
  let privateKey =
      '225889AAA37C9B4E3A29E45AA4E4C6F566FAB8656EE1D2859E10A202FD9E2C47';

  let chainName = 'band';

  it('test  transfer', async function() {
    let seq = common.getSequence(host, from);
    let tx = {
      chain_id: chain_id,
      from: from,
      account_number: account_number,
      sequence: seq,
      fees: fees,
      gas: gas,
      memo: common.randomWord(100),
      type: Irisnet.config.band.tx.transfer.type,
      return_type: 'sync',
      msg: {
        to: 'band198jy72frgw4fcfsnvdhgfkt7r7swy8ryw5tedn',
        coins: [
          {
            denom: 'uband',
            amount: '10',
          },
        ],
      },
    };

    common.verifyTx(url, tx, privateKey, chainName, verify);
    await delay(3000);
  });

  it('test delegate', async function() {
    let seq = common.getSequence(host, from);
    let tx = {
      chain_id: chain_id,
      from: from,
      account_number: account_number,
      sequence: seq,
      fees: fees,
      gas: gas,
      memo: common.randomWord(100),
      type: Irisnet.config.band.tx.delegate.type,
      msg: {
        validator_addr: 'bandvaloper1dzk85q35h994staarzwwnjeswrpge506splw3r',
        amount: {
          denom: 'uband',
          amount: '10',
        },
      },
    };

    common.verifyTx(url, tx, privateKey, chainName, verify);
    await delay(3000);
  });

  it('test undelegate', async function() {
    let seq = common.getSequence(host, from);
    let tx = {
      chain_id: chain_id,
      from: from,
      account_number: account_number,
      sequence: seq,
      fees: fees,
      gas: gas,
      memo: common.randomWord(100),
      type: Irisnet.config.band.tx.undelegate.type,
      msg: {
        validator_addr: 'bandvaloper1dzk85q35h994staarzwwnjeswrpge506splw3r',
        amount: {
          denom: 'uband',
          amount: '1',
        },
      },
    };

    common.verifyTx(url, tx, privateKey, chainName, verify);
    await delay(3000);
  });

  it('test beginRedelegate', async function() {
    let seq = common.getSequence(host, from);
    let tx = {
      chain_id: chain_id,
      from: from,
      account_number: account_number,
      sequence: seq,
      fees: fees,
      gas: gas,
      memo: common.randomWord(100),
      type: Irisnet.config.band.tx.beginRedelegate.type,
      msg: {
        validator_src_addr:
            'bandvaloper1dzk85q35h994staarzwwnjeswrpge506splw3r',
        validator_dst_addr:
            'bandvaloper1sfu6shrs6qzpxf565a20254zqyxpp0tqf3zk7g',
        amount: {
          denom: 'uband',
          amount: '1',
        },
      },
    };

    common.verifyTx(url, tx, privateKey, chainName, verify);
    await delay(3000);
  });

  it('test MsgSetWithdrawAddress', async function() {
    let seq = common.getSequence(host, from);
    let tx = {
      chain_id: chain_id,
      from: from,
      account_number: account_number,
      sequence: seq,
      fees: fees,
      gas: gas,
      memo: common.randomWord(100),
      type: Irisnet.config.band.tx.setWithdrawAddress.type,
      msg: {
        withdraw_addr: 'band1mtrm90e4nl5n7ycxc4m38kcs9cfet8hku588xw',
      },
    };

    common.verifyTx(url, tx, privateKey, chainName, verify);
    await delay(3000);
    // extracted(tx);
  });

  it('test MsgWithdrawDelegatorReward', async function() {
    let seq = common.getSequence(host, from);
    let tx = {
      chain_id: chain_id,
      from: from,
      account_number: account_number,
      sequence: seq,
      fees: fees,
      gas: gas,
      memo: common.randomWord(100),
      type: Irisnet.config.band.tx.withdrawDelegatorReward.type,
      msg: {
        validator_addr: 'bandvaloper1dzk85q35h994staarzwwnjeswrpge506splw3r',
      },
    };

    common.verifyTx(url, tx, privateKey, chainName, verify);
    await delay(3000);
  });

  // //simulate
  // function simulate(tx) {
  //     let builder = Irisnet.getBuilder(chain);
  //     let stdTx = builder.buildAndSignTx(tx);
  //     stdTx.SetPubKey(pubKey);
  //     console.log("======stdTx======");
  //     console.log(JSON.stringify(stdTx.GetData()));
  //     // console.log("======待提交交易======");
  //     let result = stdTx.Hash();
  //     console.log("hash", result.hash);
  // }

  // TODO Pending verification
  // it('test MsgWithdrawValidatorCommission', function () {
  //     let seq = common.getSequence(host,from);
  //     let tx = {
  //         chain_id: chain_id,
  //         from: from,
  //         account_number: account_number,
  //         sequence: seq,
  //         fees: fees,
  //         gas: gas,
  //         memo: common.randomWord(100),
  //         type: Irisnet.config.band.tx.withdrawValidatorCommission.type,
  //         msg: {
  //             validator_addr:
  //             "bandvaloper1qksw0e05eh652yy0zqd7f0e3q4082dxy9qxdx6",
  //         }
  //     };
  //
  //     common.verifyTx(url,tx,privateKey,chainName,verify);
  // });
});

function verify(act, exp, data) {
  console.log('result:', act, exp, data);
  assert.notExists(act.code, `tx commit failed,${act.raw_log}`);
}
