# Transmitter

## Description

L'émetteur a connu beaucoup d'action récemment. Il a été démontré qu'il est très utilisé, notamment **par les marins, en cas d'urgence**.

Récemment, un message important a été envoyé, mais il est très difficile de le lire, étant donné tout le bruit qui a été envoyé avec le message.

**Note: Il faut décoder le hex pour obtenir le flag**

---

The transmitter has been seeing a lot of action recently. It's been shown to be used a lot, especially **by sailors during emergencies**.

Recently there has been an important message that was sent, but it's very hard to read it, given all of the random noise that was sent with the message.

**Note: You have to decode the hex to obtain the flag.**

Flag Format : `FLAG{...}`

Author: Nawras (Strix#0682)

`0x7BB2B3F29faC32dd86b2B760ca180462b2E08e6E@Ropsten`

## How i flag ?

In the description, I see `Ropsten`. The challenge is in the Blockchain category, I make the link with the Ropsten Network, the test network of Ethereum.

I check the address on [Etherscan](https://ropsten.etherscan.io/address/0x7BB2B3F29faC32dd86b2B760ca180462b2E08e6E), I read the contract, and I quickly understand that the function `function sendMessage(string memory message)` allows to send message with a string parameter.

After that, I go to the events on [Events - Etherscan](https://ropsten.etherscan.io/address/0x7bb2b3f29fac32dd86b2b760ca180462b2e08e6e#events) and I see on some transactions that there is morse code, as below.

![](https://github.com/Niceclear/CTF-Writeups/blob/main/24HCTF/Blockchain/screen.png)

But there are many transactions, I can check each transaction manually but it will surely be very long. In the past, i remember that I used the Infura API, a script would be welcome.

First, I retrieve all the transactions hash from this page [CSV - Etherscan](https://ropsten.etherscan.io/exportData?type=address&a=0x7bb2b3f29fac32dd86b2b760ca180462b2e08e6e).

I put them in a list in a javascript code.

I check one parameter received from a transaction, i decode the morse code and i see it's see a HEX CODE that i decode and i do this for every transactions that contains morse code and I get the flag : `FLAG{W3LC0M3_T0_E7H3REUM_XX1CWhiW0dVf}`

PS : You check the code in the file `chall.js`
