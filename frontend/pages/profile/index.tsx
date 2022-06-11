import React, { useEffect, useRef, useState } from "react";
import Layout, { SecurityLevel } from "components/layout/Layout";
import { RemoteApiCall } from "lib/remoteAPI";
import Router from "next/router";
import Link from "next/link";
import { Container, Col, Row, Card, Form, Nav, TabContent, TabPane, Button, Image } from "react-bootstrap";
import DynamicForm from "components/Form";
import { FormElementTypes } from "components/Form/types/FormElementDto";
import { UserStatus, useUserState } from "context/user";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function UserProfile() {
	return (
		<Layout securityLevel={SecurityLevel.USER}>
			<Container>Hi</Container>
		</Layout>
	);
}
