const axios = require('axios')

const list = [
    "0x4268e5c9b9c87f869753a0cb33078872a84f6860f7d8f2dbbbedf74f910b75fd",
    "0x39e3cd8c681af36b44c718fe3b0041f859e2b70f37de4e74500ae7650609b77c",
    "0x2f58a435e47dcd9c6e5f4367529efa8167bd24e14e111b441a16a9baa8e21507",
    "0x023e0770a995b34f382c9ca0bce5161d25bf9caa68a99c8fcde6465a2e3d3326",
    "0xca7c8503bc9ee227fdba34b96e4ee1b3b492a4a90fe90fffdcb61bd9915e1fa2",
    "0x2de489ad50027f65b8b605d721cbc8504efd34c7109e07b4b0dcb5c3f114703d",
    "0x79b2723f6720004b6bc5bd8fe4e5706412adf090810be1784595bced622769bc",
    "0x6cdbe1e55013bc16868beef9f16604410784534c5c31469885aadbcd545ecc06",
    "0xe01ffb2738778839ba134603f714a937037625de3735b1677d1f2dc13799b8d6",
    "0x5ab954a101167a2e5dbc94f9a9a1daec68554646fe1e27dafce0cce73b96ee81",
    "0xa07a4268dc6c84d4fd79dc763cc35c3315ff980fcb4c1f4f56dfbd5b43b2400c",
    "0x6e9c595462b36170d8c4ca405fd7d82844dddd6ebebad4c9846a8af131a37286",
    "0x3cc39f8b7c7afdab6088e8664cf43668601add1e7cf650a7fbbba592fd8d4e58",
    "0xe608fd1d33815cb9ca0808ba3d71b5e6cd9e2fb6fae51e289e8282405fe98e19",
    "0x15c583ae1ff97de6bf8f018850851663511b56e16eaaee687200e187c7f473ac",
    "0x43f7652dfe8622fe30b9be19b1aee1389ffd5c505c2c65f810096886fda4685f",
    "0xb02e90d35a1e50c127cf07296b549835230693c86471502e0066d104ea51f17a",
    "0xa9774c324aff9ce1027b82d554d2756076c0cae705e1ee6295bf28e15f17c890",
    "0xe08b22f6dc34bde060eb6a85c55e389213fe65c915c7f57fde383f75096b6048",
    "0x2a862b32fa74b3b66fac8026c02174fbcabf252abcad662a4d560f459d16a497",
    "0x0a4294fc53f6ebd61cc6ff862c4552274fd98a9204858239997c5f2e594e730d",
    "0xbcfbb7125339867eb3aa420c78eda998c3b299a5383ecef5ff8b857f47c4fe9f",
    "0x06551d0f3fc3922941da8199d2f015531bbd0fe9a56e8f8b53c4e68ba9473611",
    "0xf85c806e402d37e6721de9966d9018f047d8d8d590e8920a53f4b3a70667f7d9",
    "0xa02e7c978cca977b79701dbb3af4acc5cc5de5f338046cfd24c02cc2454fa1aa",
    "0xaa7f0e23ea4be802913e85961a81c58e1e4ec211f1acae302d5a8ccfcf4a3c65",
    "0xc24fcc6f11ee08258945b74acbfe48664761fd459ce176d1895d50b5d0276542",
    "0x28f6519fa456d6fb8628ee9e8db8dc79deaeb89993c0fd340127b62070ec63c6",
    "0x506da93038eae4ac6c876b2d0f88207564a80f96ea81351feeebfcbbf83a94a1",
    "0x0fb7cf77cbef05789d5f83e12f4dbe436e29359f24f98397debd05edaf6e099a",
    "0xbe120655fd4fd58273faffd2e23ddb21d3bf9bcae27b9b42cff8dfc9994405ef",
    "0x2584acf04968211bc7c27f0745828cbbfe7dd2d452e1a39fbe282f674a7c9e77",
    "0xdc8aef9fbcb6e567af946d59d24f9ecb2dcf0e42142fd80b2d4d74189307e4d1",
    "0x1386b6a5c39992c2380f8ece99f6da330b1972cb46c5e7eca8e4d03beb93b7e3",
    "0x414186c3430925ef349b3551cbd8ff80bbcfe291969e0c95cd812527b9ac8979",
    "0xef51b145955d3b8ea565b4d2574ef5697e3d881fef8c79b4b74352a951763990",
    "0x944d774a02e5c986c44740bc8bdc5c4af58cc44057d604c402ec2bbf0884ceb2",
    "0x65677d50edf4a344556edf9c837786e3ec26911e3f9dd0e3c47e85fe3907d4f7",
    "0x7277bcc6c8b56f21f750048ae86e69f89e44507220ae9c73beafa2ae9e6471e9",
    "0xb1739f843a594cfe6251f8b3d93dc1622a915ef9dd50568b23ed3f66c293e707",
    "0x4cc33a6808519dad704694e928136309ba0b49fadbbf56ce20d4933781007fc5",
    "0x8ee350c0148792366083fa5b0c8d16757c8e53cd5ffbe6bd8989aa9832a8db29",
    "0x65403b05c570e66bdd36413a6457bab15039f62f2b6fbc4ae1f44b70c1292698",
    "0xceb64686712c8700f3abffda64eb2b175cb4811df6754d3c4a54545c545ea4c3",
    "0x48870bb41dcadd95ca6a2c5647158fff2b9f0412537fe3a92d481ca69363ed3f",
    "0x3c9c8da3b52d94a592b2cf5e9716bb7ee5de0bcbf6af47c66bd38971040820ae",
    "0x40d58a84646198e697539fbba6de161924015257dc0931805939420b54d44f4f",
    "0xd89655d9813fd3dd8b3a5ed98bdb31ee2d44ecb4fb2d656ab685e390faed9b48",
    "0xf9787090050c463300771f8fbc72b8efc4b7405adfd74645a7291ed4d0218c4d",
    "0xa32ba791a2240a8b785e1269ad3eaa95f70ef7021c7e8b7473f56e91a81dae17",
    "0xa3652a3dc6530a002cacbc5001f97d4776ddc611f0337c935ce83dda67d6aa1c",
    "0xe97e55730b41b644d05079db6e37bf42ca81ce68b5c55188071e248bff18cc16",
    "0x5a91c994af0efe5b02cae1794891e0e0e3a42ced96bfac40ea9a656d9544cdc4",
    "0x18b12d353198f5ed00dd607ca010553248c7cfff589a04be89b18ced1ae50de4",
    "0x48d48051a078f965b9314d72637801356d75eebea95f24f0f993e427c3a942ee",
    "0xd71e55ec8c61f4e3a7f183ef370c18ce8468b436451ced1e5ac84785105cea57",
    "0x3a575d66b51b6ed843cc90892b689d48c09bd1b35c63f8611adebc009e0e8f2d",
    "0x2bf1baf59dede28394fbdeb70408a36a2590b7c384cd5d5a07a88b35111e1039",
    "0xba452714c28d3cbc77ee7d4256261d537a4e536356ae848afc92f452d33d7b5d",
    "0x4eec24f2f32c931a5de2d812256e4b7dc0e4563b1e45e463aa1f58befaee038c",
    "0x5d72fb3a7d6ba04918b20875c32a49fbaff6395e94f40066b2369ea11ffcd43c",
    "0x21d3f2f95e8a081f0de0f78d3bb41388bd2201f8e77ed612924c230c558853b2",
    "0xfc8249f76d79809d85bd3425c9fca7eaace5870ae66be96e845f1be22f69cb91",
    "0xbc25f92b8a654a3fdc157212ef681f8ca20a79cab5e32b4b3a98c2ceea2bbfb6",
    "0xb5d4fee4f46e556a60a122c3f1fd2e56f4e53700163a3a756b232ffb168b51c9",
    "0x176ad3a4165d66ef0dd90a111d7674f6d73d84da3719ac148cd4decf2428105f",
    "0x4a624f721086baafaa58a72544aade6ad025acac1f45fa0d4dbc47e6867a4e4e",
    "0x8e9100a7e65cb86865ee529df9a3bc8dbe362964e54ee1d9ff15916c497987c5"
]

/**
 * Decode morse code (from : https://stackoverflow.com/questions/43726344/js-decoding-morse-code)
 * @param morseCode morse in string
 * @returns {string}
 */
function decodeMorse(morseCode) {
    let ref = {
        '.-': 'A',
        '-...': 'B',
        '-.-.': 'C',
        '-..': 'D',
        '.': 'E',
        '..-.': 'F',
        '--.': 'G',
        '....': 'H',
        '..': 'I',
        '.---': 'J',
        '-.-': 'K',
        '.-..': 'L',
        '--': 'M',
        '-.': 'N',
        '---': 'O',
        '.--.': 'P',
        '--.-': 'Q',
        '.-.': 'R',
        '...': 'S',
        '-': 'T',
        '..-': 'U',
        '...-': 'V',
        '.--': 'W',
        '-..-': 'X',
        '-.--': 'Y',
        '--..': 'Z',
        '.----': '1',
        '..---': '2',
        '...--': '3',
        '....-': '4',
        '.....': '5',
        '-....': '6',
        '--...': '7',
        '---..': '8',
        '----.': '9',
        '-----': '0',
    };

    return morseCode
        .split('   ')
        .map(
            a => a
                .split(' ')
                .map(
                    b => ref[b]
                ).join('')
        ).join(' ');
}

/**
 * Convert hex to ASCII (from : https://www.codegrepper.com/code-examples/javascript/Convert+Hex+to+string+js)
 * @param string hex in string
 * @returns {string}
 */
function hex_to_ascii(string) {
    let hex = string.toString();
    let str = '';
    for (let n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

const data = {
    "jsonrpc": "2.0",
    "method": "eth_getTransactionByHash",
    "id": 1
}

async function main() {
    let final_string;

    for (const hash of list) {
        data["params"] = [hash]
        
        // Get your project ID here : infura.io
        let req = await axios.post(
            "https://ropsten.infura.io/v3/your_project_id",
            data
        )

        let regex = new RegExp('((-|\\.)[-.\\s]+)');
        let match = regex.exec(hex_to_ascii(req.data.result.input));

        if (match !== null) {
            final_string += hex_to_ascii(decodeMorse(match[0]))
        }
    }
    console.log(final_string)
}

main()
