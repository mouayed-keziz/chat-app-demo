import { getAllUsers } from "../actions/user_action";
import { useState } from "react";
export default function Debugging() {
    const [data, setData] = useState([]);
    return (
        <div className="login">
            <button onClick={() => {
                getAllUsers().then(res => {
                    setData(res);
                }
                );
            }
            }>get all users</button>
            {data.map(element => {
                return (
                    <div key={element}>
                        <p>{element}</p>
                    </div>
                );
            }
            )}
        </div>
    );
}