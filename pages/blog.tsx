import Head from "next/head";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import BlogItem from "components/blog/BlogItem";
import firebase from "firebase/app";
import BlogClass, { BlogInterface } from "@/model/Blog";

const Blog = () => {
  const [blogList, setBlogList] = useState<BlogInterface[]>([]);
  const [seletectedBlog, setSelectedBlog] = useState<BlogInterface>(new BlogClass());
  const { isOpen: isOpenBlogDetail, onOpen: onOpenBlogDialog, onClose: onCloseBlogDetail } = useDisclosure();

  useEffect(() => {
    console.log("get blog data");

    const database = firebase.database();
    const getBlogList = async () => {
      const blogListRef = database.ref("blog");
      await blogListRef.on("value", (snapshot) => {
        const data: BlogInterface[] = snapshot.val();
        setBlogList(data);
      });
    };
    getBlogList();
  }, []);

  const showBlogDetail = (blog: BlogInterface) => {
    console.log(blog);
    setSelectedBlog(blog);
    onOpenBlogDialog();
  };
  return (
    <Box>
      <Head>
        <title>Coding Test Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container maxW="container.xl" mt="30px">
          <Heading as="h2" mb="5">
            Blogs
          </Heading>
          <SimpleGrid minChildWidth="200px" spacing="40px">
            {blogList && blogList.length
              ? blogList.map((blog) => <BlogItem key={blog.id} blog={blog} showDetail={showBlogDetail} />)
              : null}
          </SimpleGrid>
        </Container>
        <Modal isCentered size="lg" onClose={onCloseBlogDetail} isOpen={isOpenBlogDetail} scrollBehavior="inside">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{seletectedBlog.name}</ModalHeader>
            <ModalBody>
              <Box
                height="300px"
                backgroundImage={`url(${seletectedBlog.imageUrl})`}
                backgroundPosition="center"
                backgroundSize="cover"
                backgroundRepeat="no-repeat"
                borderTopRadius="lg"
              />
              <Text mt="4">{seletectedBlog.description}</Text>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onCloseBlogDetail}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </main>
    </Box>
  );
};

export default Blog;
