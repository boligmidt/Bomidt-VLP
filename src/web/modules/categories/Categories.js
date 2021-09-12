import React, { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_CATEGORIES, DELETE_CATEGORY, ADD_CATEGORY } from 'api/Categories';

import styled from 'styled-components';
import Layout from 'components/layout/Layout';
import PageHeader from 'components/general/PageHeader';
import Loading from 'components/general/Loading';

import Category from 'web/modules/categories/Category';
import CategoryForm from 'web/modules/categories/CategoryForm';

const CategoryListWrapper = styled.div`
	border: none;
	margin: 1rem;
	padding-left: 0.5rem;
`;

export default function Categories() {
	const { data: { items = null } = {}, loading, error } = useQuery(
		GET_CATEGORIES
	);

	const [deleteCategory, { error: deleteError }] = useMutation(
		DELETE_CATEGORY,
		{
			refetchQueries: ['findCategories'],
		}
	);

	const [addCategory, { error: addCategoryError }] = useMutation(
		ADD_CATEGORY,
		{
			update(cache, { data: { newCategory } }) {
				const { items } = cache.readQuery({ query: GET_CATEGORIES });
				items.items = items.items.concat(newCategory);
				cache.writeQuery({
					query: GET_CATEGORIES,
					data: { items: items },
				});
			},
		}
	);

	const [categories, setCategories] = useState();

	useEffect(() => {
		const init = async () => {
			if (items) {
				let sortedItems = await items.items.sort((a, b) => {
					return a.order - b.order;
				});
				setCategories(sortedItems);
			}
		};
		init();
	});

	const submitNewCategory = async data => {
		addCategory({ variables: data });
	};

	const removeCategory = async id => {
		if (!confirm('Er du sikker?')) return;

		await deleteCategory({ variables: { _id: id } });
	};

	if (loading) return <Loading />;
	if (error || addCategoryError || deleteError)
		return (
			<p>{JSON.stringify(error || addCategoryError || deleteError)}</p>
		);

	return (
		<Layout>
			<PageHeader>Kategorier</PageHeader>

			<CategoryListWrapper>
				<CategoryForm newCategory={submitNewCategory} />
			</CategoryListWrapper>

			<CategoryListWrapper>
				{categories &&
					categories.map((item, index) => (
						<Category
							key={item._id}
							category={item}
							index={index}
							deleteCategory={removeCategory}
						/>
					))}
			</CategoryListWrapper>
		</Layout>
	);
}
