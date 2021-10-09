import pandas as pd

df = pd.read_csv('movie_out.csv', sep='\t', index_col=False)
# df = df.tail(10000)
# df = df[df["runtime"].str == '\\N']


# df = df[~df['release_year'].str.contains('N')]
# df = df[~df['runtime'].str.contains('N')]

df.so


print(df)
print("size: ", df.shape[0])

df.to_csv('movie_out.csv', sep='\t', index=False)
