import { Button } from "@chakra-ui/button";
import { Avatar, FormControl, FormLabel, WrapItem } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/layout";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import commonStyles from "../../constants/commonStyles";

const Register = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigation = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      // title: "Please Fill all the Feilds",

      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      // title: "Passwords Do Not Match",

      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);

      // title: "Registration Successful",

      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      navigation("/chats");
    } catch (error) {
      // title: "Error Occured!",

      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      // title: "Please Select an Image!",

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
      // title: "Please Select an Image!",

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
        <Input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
        <Button
          //   isLoading

          colorScheme="teal"
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
        isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Register;
