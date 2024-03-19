import { useEffect, useState } from "react";
import "../styles/Inventory.css";
import { IInventory } from "../utility/interfaces";
import { toast } from "react-toastify";
import { BACKEND_DEV_URL } from "../utility/common";
import axios from "axios";
import Navbar from "./Navbar";
// import "../assets/down.png"

const Inventory = () => {
  const [inventory, setInventory] = useState<IInventory[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [toDelete, setToDelete] = useState<string>("");

  // editing statesS
  const [editId, setEditId] = useState("");
  const [editProductName, setEditProductName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState(0);
  const [editQuantity, setEditQuantity] = useState(0);
  const [editImgSrc, setEditImgSrc] = useState("");
  const lowStock = 100;
  const highStock = 500;

  useEffect(() => {
    axios
      .get(BACKEND_DEV_URL + "/inventory")
      .then((response) => setInventory(response.data.inventory))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (toDelete) {
      const updatedInventory = inventory.filter((item) => item.id !== toDelete);
      setInventory(updatedInventory);
      setToDelete("");
    } else if (inventory.length > 0) {
      axios
        .post(BACKEND_DEV_URL + "/inventory", {
          inventory: inventory,
        })
        .then((res) => {
          console.log(res, " inventory updated!");
        });
    }
  }, [inventory, toDelete]);

  const handleAddToInventory = () => {
    console.log(inventory, " update in inventory");
    const updatedInventory = ([...inventory] ?? []) as IInventory[];
    const id = "#" + Number(updatedInventory.length + 1);
    const newProduct = {
      id: id,
      productName,
      description,
      price,
      quantity,
      imgSrc,
    } as IInventory;

    updatedInventory.push(newProduct);
    setInventory(updatedInventory);
    setProductName("");
    setDescription("");
    setImgSrc("");
    setPrice(0);
    setQuantity(0);
    console.log(updatedInventory, " update in inventory");
  };

  const handleDelete = (id: string) => {
    console.log(id, " in id");
    toast.warning(
      <div>
        <p>Do you really want to delete!</p>
        <button
          onClick={() => {
            setToDelete(id);
            toast.dismiss();
          }}
        >
          Yes,Really!
        </button>
        <button
          onClick={() => {
            // setToDelete(false);
            toast.dismiss();
          }}
        >
          No, I was just checking!
        </button>
      </div>,
      { position: "top-right" }
    );

    console.log(toDelete, " after toast");
  };

  const handleEditCancle = () => {
    setEditId("");
  };

  const handleEdit = (id: string) => {
    console.log("edit button clicked" + id);
    if (editId != "") {
      toast.warn(`Please save or cancel previous editing`, {
        position: "top-center",
      });
      return;
    }
    setEditId(id);
    const item = inventory.find((item) => item.id === id);
    if (item) {
      setEditProductName(item.productName ?? "");
      setEditDescription(item.description ?? "");
      setEditImgSrc(item.imgSrc ?? "");
      setEditPrice(item.price ?? 0);
      setEditQuantity(item.quantity ?? 0);
    }
  };

  const handleSaveClick = (id: string) => {
    // Find the index of the edited item in the inventory
    const index = inventory.findIndex((item) => item.id === id);

    // If the item is found, proceed with the update
    if (index !== -1) {
      // Create a copy of the edited item
      const updatedItem = { ...inventory[index] };

      // Update the fields if they are not empty or zero
      if (editProductName.length > 0) {
        updatedItem.productName = editProductName;
        setEditProductName("");
      }
      if (editDescription.length > 0) {
        updatedItem.description = editDescription;
        setEditDescription("");
      }
      if (editImgSrc.length > 0) {
        updatedItem.imgSrc = editImgSrc;
        setEditImgSrc("");
      }
      if (editPrice !== 0) {
        updatedItem.price = editPrice;
        setEditPrice(0);
      }
      if (editQuantity !== 0) {
        updatedItem.quantity = editQuantity;
        setEditQuantity(0);
      }

      // Create a copy of the inventory array and update the edited item
      const updatedInventory = [...inventory];
      updatedInventory[index] = updatedItem;

      // Set the updated inventory and reset the edit state
      setInventory(updatedInventory);
      setEditId("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="inventory-container">
        <h1 className="heading">INVENTORY STATUS</h1>
        <div className="add-to-inventory-container">
          <input
            required={true}
            className="item"
            type="text"
            placeholder="Product Name"
            value={productName ?? ""}
            onChange={(e) => setProductName(e.target.value)}
          />
          {/* <input
            required={true}
            className="item"
            type="text"
            placeholder="description"
            value={description ?? ""}
            onChange={(e) => setDescription(e.target.value)}
          /> */}
          <input
            required={true}
            className="item"
            type="number"
            placeholder="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <input
            required={true}
            className="item"
            type="number"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <input
            required={true}
            className="item"
            type="text"
            placeholder="image src"
            value={imgSrc ?? ""}
            onChange={(e) => setImgSrc(e.target.value)}
          />
          <button
            className="add-to-inventory"
            onClick={() => handleAddToInventory()}
          >
            +
          </button>
        </div>
        <div className="inventory-table-container">
          <div className="table-headings">
            <p>Name of product</p>
            {/* <p>Descriptiom</p> */}
            <p>Image source</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Status</p>
            <p>Buttons</p>
          </div>
          {inventory.map((item) => {
            let stockIndicatorImg = "src/assets/yellow.png";
            let stockTitle = "modarate stock";

            if (item.quantity >= highStock) {
              stockIndicatorImg = "src/assets/high.png";
              stockTitle = "high stock";
            }
            if (item.quantity <= lowStock) {
              stockIndicatorImg = "src/assets/low.png";
              stockTitle = "low stock";
            }

            return (
              <div key={item.id} className={`row`}>
                {/* <div className="stock-indicator">{stockIndicator}</div> */}

                {item.id == editId ? (
                  <div id="edit-div">
                    <input
                      required
                      type="text"
                      id="edit-items"
                      className="non-edit-item"
                      placeholder="product name"
                      value={editProductName}
                      onChange={(e) => setEditProductName(e.target.value)}
                    ></input>
                    {/* <input
                      required
                      type="text"
                      id="edit-items"
                      placeholder=" description"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    ></input> */}
                    <input
                      required
                      type="text"
                      id="edit-items"
                      className="non-edit-item"
                      value={editImgSrc}
                      placeholder="image url"
                      onChange={(e) => setEditImgSrc(e.target.value)}
                    ></input>
                    <input
                      required
                      type="number"
                      id="edit-items"
                      className="non-edit-item"
                      placeholder="price"
                      value={editPrice}
                      onChange={(e) => setEditPrice(Number(e.target.value))}
                    ></input>
                    <input
                      required
                      type="number"
                      id="edit-items"
                      className="non-edit-item"
                      value={editQuantity}
                      placeholder="quantity"
                      onChange={(e) => setEditQuantity(Number(e.target.value))}
                    ></input>
                    <div className="buttons">
                      <button
                        title="save"
                        className="edit-btn"
                        id="save-btn"
                        onClick={() => handleSaveClick(item.id)}
                      >
                        ✅
                      </button>
                      <button
                        title="edit"
                        className="edit-btn"
                        id="cancel-btn"
                        onClick={() => handleEditCancle()}
                      >
                        ❌
                      </button>
                      <button
                        title="delete"
                        className="delete-btn edit-btns"
                        onClick={() => handleDelete(item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="non-edit">
                    <p className="non-edit-item product-name">
                      {item.productName}
                    </p>
                    {/* <p className="non-edit-item description">
                      {item.description}
                    </p> */}
                    <p>
                      <img
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                        src={item.imgSrc}
                        alt=""
                      />
                    </p>
                    <p className="non-edit-item price">{item.price}</p>
                    <p className="non-edit-item quantity">{item.quantity}</p>
                    <div className="stock-img">
                      <img
                        style={{ width: "30px", height: "30px" }}
                        src={stockIndicatorImg}
                        alt=""
                        title={stockTitle}
                      />
                    </div>
                    <div className="non-edit-buttons">
                      <button
                        title="delete"
                        className="delete-btn"
                        onClick={() => handleDelete(item.id)}
                      >
                        🗑️
                      </button>

                      <button
                        title="edit"
                        className="edit-btn"
                        onClick={() => handleEdit(item.id)}
                      >
                        🔧
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* <div className="footer">
        <h1>END</h1>
      </div> */}
      </div>
    </>
  );
};

export default Inventory;
