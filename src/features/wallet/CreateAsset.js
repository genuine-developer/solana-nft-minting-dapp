import React, { useCallback, useState } from "react";
import { useSelector } from 'react-redux';
import { PublicKey } from '@solana/web3.js';
import { toast, ToastContainer } from 'react-toastify';
import Navbar from "components/Navbars/AuthNavbar.js";
import WalletButton from 'features/wallet/WalletButton'
import { Creator, extendBorsh } from 'utils/metaplex/metadata';
import mintNFT from 'utils/mintNFT';
import Uploader from "./Uploader";
import Input from "../../components/Input";
import { connectState, getConnection } from './walletSlice';

export default function CreateAsset() {
  const connection = useSelector(getConnection);
  const connected = useSelector(connectState);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [NFTPrice, setNFTPrice] = useState('');
  const [file, setFile] = useState(null);
  
  //Mint NFT
  const create = useCallback(async () => {
    console.log('connection', connection)
    console.log('file', file);
    if (!file) {
      toast('Please upload file')
      return;
    }

    console.log('window.solana', window.solana)
    const wallet = window.solana;
    if (!connected || !wallet.publicKey) {
      console.log('Not connected');
      toast('Please connect your wallet')
      return;
    }

    setLoading(true);
    extendBorsh();

    let collection = {
        name: "Project Image",
        family: 'Charity Project',
    };

    const metadata = {
      animation_url: undefined,
      creators: [
        new Creator({
          address: new PublicKey(wallet.publicKey.toString()),
          verified: true,
          share: 100,
        }),
      ],
      description: description || '',
      price: NFTPrice,
      image: file.name,
      name: name || '',
      symbol: '',
      sellerFeeBasisPoints: 100, //this.royalties * 100,
      attributes: null, //getParsedAttributes(),
      collection,
      properties: {
        category: 'charity',
        files: [{ type: file.type, uri: file.name }],
      },
    };
    try {
      const { payperLink } = await mintNFT(connection, wallet, [file], metadata)
      if (payperLink) {
        // const win = window.open(payperLink, '_blank');
        // if (win != null) {
        //   win.focus();
        // }
      }
      console.log("success", payperLink)
    } catch (error) {
      console.error(error)
    }

    setLoading(false);
  }, [connected, connection, name, description, NFTPrice, file]);

  return (
    <>
      <Navbar transparent WalletButton={WalletButton} />
      <main className="profile-page">
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="text-center mt-32">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    Create new item
                  </h3>
                  <div className="w-1/2 mx-auto text-left">
                    <p className="font-bold">
                      Image
                    </p>
                    <Uploader handleImageChange={({ file }) => setFile(file)}/>

                    <p className="font-bold mt-6">Title</p>
                    <Input
                      value={name}
                      placeholder={"Title"}
                      onChange={e => setName(e.target.value)}
                    />
                    <p className="font-bold mt-6">Price</p>
                    <Input
                      value={NFTPrice}
                      onChange={e => setNFTPrice(e.target.value)}
                      placeholder={"0"} 
                    />
                    <p className="font-bold mt-6">Description</p>
                    <Input
                      value={description}
                      placeholder={
                        "Provide a detailed description of your item"
                      }
                      multiLine={true}
                      onChange={e => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <button
                        className="bg-lightBlue-300 text-white px-6 py-2 rounded-lg"
                        onClick={create}
                        disabled={loading}
                      >
                        {loading && <span>Creating...</span>}
                        {loading && (
                          <i
                            className="fa fa-refresh fa-spin"
                            style={{ marginRight: "5px" }}
                          />
                        )}
                        {!loading && <span>Create</span>}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ToastContainer position="top-center"/>
    </>
  );
}
