import { Button } from "antd";
import React, { useState } from "react";

import { useAvatar } from "../hooks";

import ReactJson from "react-json-view";

/*
  ~ What it does? ~

  Randomly generate Avatars and view minted ones from the API!

  Processes an OpenRaster (.ora) file of generative avatars
  to upload generative avatars to IPFS and create a metadata
  json file usable for tokenUris.
  
  See public/avatars/avatarimages.ora for examples of .ora files.
  .ora files can be opened and exported from PSD files via GIMP.

  ~ How can I use? ~

  Put your .ora file in public/avatars/avatarimages.ora

  Client Side:
  <AvatarViewer/>

  Server Side:
  Copy the metadata json to packages/avatar/data/metadata.json

  ~ Features ~

  - easily view random avatars
  - Define avatar specs easily
  - Assumes avatars are pre-minted for now
*/

const STARTING_CONFIG_JSON = {
    "Getting Started":
        "Press ( 😀 New Avatar ), this JSON view will contain the avatar's config.json once it's been loaded.",
};

export default function AvatarViewer() {
    const [configJSON, setConfigJSON] = useState(STARTING_CONFIG_JSON);
    const [canvasRef, dataParts, infoDataParts, setInfoDataParts, changeAvatarColor,/*  canvasDraw,  canvasDraw1, */ canvasWidth, canvasHeight, setNewAvatar] = useAvatar();

    console.log("your parts", dataParts);

    const handleClickNewAvatarButton = async event => {
        setConfigJSON(await setNewAvatar());
        //console.log(infoDataParts, "-------------------------------------");
    };

    function changeItemColor(i, color, e) {
        //console.log(e);
        dataParts[i].color = color;
        //setInfoDataParts(dataParts);
        changeAvatarColor(dataParts);
    }

    return (
        <div style={{ paddingTop: 32, width: 740, margin: "auto", textAlign: "left" }}>
            <div>
                <Button onClick={handleClickNewAvatarButton} size="large" shape="round">
                    <span style={{ marginRight: 8 }}>
                        <span role="img" aria-label="fuelpump">
                            😀
                        </span>
                    </span>
                    New Avatar
                </Button>
            </div>

            <div style={{ display: "flex", "flex-direction": "row" }}>
                <div>
                    <canvas className="Avatar-canvas" ref={canvasRef} width={canvasWidth} height={canvasHeight} />
                    <ul>
                        {infoDataParts.map((item, index) => (
                            <ul>
                            <li>{item.name}</li>
                            <li >{item.color}</li>
                            <input type="color" value={item.color} onChange={e => changeItemColor(index, e.target.value, item)} />
                            <p></p>
                            <p></p>
                            <p></p>
                            </ul>
                        ))}
                    </ul>
                </div>
                <ReactJson
                    style={{ padding: 8 }}
                    src={configJSON}
                    theme="pop"
                    enableClipboard={false}
                    onEdit={(edit, a) => {
                        setConfigJSON(edit.updated_src);
                    }}
                    onAdd={(add, a) => {
                        setConfigJSON(add.updated_src);
                    }}
                    onDelete={(del, a) => {
                        setConfigJSON(del.updated_src);
                    }}
                />
            </div>
        </div>
    );
}
