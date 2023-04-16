import json
import sys
import pickle
import scipy as sp
import numpy as np
import re
import os
# Ignore warnings to read output from script correctly
import warnings
warnings.filterwarnings("ignore")


def get_results_from_query_vector(query, k=10, matrix_filename="matrix"):
    # Get matrix
    with open(f"{os.path.dirname(__file__)}/calculated-components/{matrix_filename}.pickle", "rb") as f:
        matrix, matrix_norm = pickle.load(f)

    # Get word set
    with open(f"{os.path.dirname(__file__)}/calculated-components/word_set.pickle", "rb") as f:
        word_set = pickle.load(f)

    # Get articles
    with open(f"{os.path.dirname(__file__)}/calculated-components/articles.pickle", "rb") as f:
        articles = pickle.load(f)

    # Create query vector
    query_vector = sp.sparse.lil_matrix((len(word_set), 1))

    # Fill query vector
    for word in re.findall("[^\W\d_]+", query.lower()):
        if word in word_set:
            query_vector[word_set.index(word)] = 1

    # Get vector norm
    query_vector_norm = sp.sparse.linalg.norm(query_vector)
    norm = query_vector_norm * matrix_norm

    # Calculate probabilities
    probabilities = (query_vector.T @ matrix) / norm

    probabilities = [(probabilities[0, i], i) for i in range(matrix.shape[1])]

    # Sort probabilities
    probabilities = list(map(lambda x: (x[0], articles[x[1]]), filter(lambda x: not np.isnan(x[0]) and np.isfinite(
        x[0]) and x[0] > 0, sorted(probabilities, key=lambda x: x[0], reverse=True))))

    # Get top k results
    result = []
    for i in range(min(k, len(probabilities))):
        probabilities[i][1]['probability'] = f"{probabilities[i][0]:.2f}"
        result.append(probabilities[i][1])

    print(json.dumps({"result": result}))


# Run script
try:
    # WARNING: This can slow down script, please check performance
    import spacy
    nlp = spacy.load("en_core_web_sm")
    query = " ".join([token.lemma_ for token in nlp(sys.argv[1])])

    # query = sys.argv[1]
    get_results_from_query_vector(query, k=int(
        sys.argv[2]), matrix_filename=sys.argv[3])
except Exception as e:
    sys.exit(json.dumps({"error": str(e)}))
