import { Button } from "@chakra-ui/button";
import { Avatar, FormControl, FormLabel, WrapItem } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/layout";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import commonStyles from "../../constants/commonStyles";
import toast from "react-hot-toast";

const Register = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigation = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password) {
      toast.error(`Please Fill all the Feilds`);

      setPicLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/auth/register`,
        {
          name,
          email,
          password,
          image: pic,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const tokenAddedUser = data.user;
      tokenAddedUser.token = data.token;
      localStorage.setItem("userInfo", JSON.stringify(tokenAddedUser));
      console.log(data);
      toast.success(data.message);
      setPicLoading(false);
      navigation("/chats");
    } catch (error) {
      toast.error(error.messages);

      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast.error("Please Select an Image!");

      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dqficjwys");
      axios
        .post("https://api.cloudinary.com/v1_1/dqficjwys/image/upload", data)
        .then((res) => {
          setPic(res.data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast.error("Please Select an Image!");

      setPicLoading(false);
      return;
    }
  };

  return (
    <VStack spacing="5px">
      <WrapItem
        boxShadow={commonStyles.shadow}
        borderRadius={"50%"}
        position={"relative"}
      >
        <Avatar size="xl" name={name} src={pic} />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
          style={{
            opacity: 0,
            position: "absolute",
            width: "20px",
            height: "20px",
            zIndex: 10,
            bottom: 2,
            right: 1,
          }}
        />
        <Button
          isLoading={picLoading}
          colorScheme="blue"
          variant="solid"
          size="xs"
          sx={{
            borderRadius: "50%",
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        >
          +
        </Button>
      </WrapItem>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isDisabled={!name || !email || !password}
        isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Register;
