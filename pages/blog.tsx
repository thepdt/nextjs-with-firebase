import Head from "next/head";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import BlogCard from "components/blog/blog-card/BlogCard";
import firebase from "firebase/app";
import BlogClass, { BlogInterface } from "@/model/Blog";
import NProgress from "nprogress";

const Blog = () => {
  const [blogList, setBlogList] = useState<BlogInterface[]>([]);
  const [seletectedBlog, setSelectedBlog] = useState<BlogInterface>(new BlogClass());
  const { isOpen: isOpenBlogDetail, onOpen: onOpenBlogDialog, onClose: onCloseBlogDetail } = useDisclosure();

  useEffect(() => {
    const database = firebase.database();
    const getBlogList = async () => {
      try {
        NProgress.start();
        const blogListRef = database.ref("blog");
        await blogListRef.on("value", (snapshot) => {
          const data: BlogInterface[] = snapshot.val();
          setBlogList(data);
        });
      } catch (error) {
      } finally {
        NProgress.done();
      }
    };
    getBlogList();
  }, []);

  const showBlogDetail = (blog: BlogInterface) => {
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
              ? blogList.map((blog) => <BlogCard key={blog.id} blog={blog} showDetail={showBlogDetail} />)
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
