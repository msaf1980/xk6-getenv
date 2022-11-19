// This is a PoC/illustrative code to show how to share a single integer that goes up in k6 on a
// single instance

package increment

import (
	"fmt"
	"math/rand"
	"os"
	"strconv"
	"strings"

	"go.k6.io/k6/js/modules"
)

func init() {
	modules.Register("k6/x/getenv", New())
}

type Module struct{}

func getInt(value string, defaultValue int) (int, error) {
	n, err := strconv.Atoi(value)
	if err != nil {
		return defaultValue, err
	}
	return n, nil
}

func getIntRand(value string, defaultValue int) (int, error) {
	values := strings.SplitN(value, ":", 2)
	if len(values) == 1 {
		return getInt(values[0], defaultValue)
	}

	min, err := strconv.Atoi(values[0])
	if err != nil {
		return 0, err
	}
	max, err := strconv.Atoi(values[1])
	if err != nil {
		return 0, err
	}
	if min < 0 || max < 0 {
		return 0, fmt.Errorf("invalid random range: %d:%d", min, max)
	}
	if min == max {
		return min, nil
	}
	if max < min {
		max, min = min, max
	}

	return rand.Intn(max+1-min) + min, nil
}

func getFloat(value string, defaultValue float64) (float64, error) {
	f, err := strconv.ParseFloat(value, 64)
	if err != nil {
		return defaultValue, err
	}
	return f, nil
}

func (m *Module) GetEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if len(value) == 0 {
		return defaultValue
	}
	return value
}

func (m *Module) GetEnvInt(key string, defaultValue int) (int, error) {
	value := os.Getenv(key)
	if len(value) == 0 {
		return defaultValue, nil
	}

	return getInt(value, defaultValue)
}

func (m *Module) GetEnvIntRand(key string, defaultValue int) (int, error) {
	value := os.Getenv(key)
	if len(value) == 0 {
		return defaultValue, nil
	}

	return getIntRand(value, defaultValue)
}

func (m *Module) GetEnvFloat(key string, defaultValue float64) (float64, error) {
	value := os.Getenv(key)
	if len(value) == 0 {
		return defaultValue, nil
	}

	return getFloat(value, defaultValue)
}

func (m *Module) GetString(value, defaultValue string) string {
	if len(value) == 0 || value == "undefined" {
		return defaultValue
	}
	return value
}

func (m *Module) GetInt(value string, defaultValue int) (int, error) {
	if len(value) == 0 || value == "undefined" {
		return defaultValue, nil
	}

	return getInt(value, defaultValue)
}

func (m *Module) GetIntRand(value string, defaultValue int) (int, error) {
	if len(value) == 0 || value == "undefined" {
		return defaultValue, nil
	}

	return getIntRand(value, defaultValue)
}

func (m *Module) GetFloat(value string, defaultValue float64) (float64, error) {
	if len(value) == 0 || value == "undefined" {
		return defaultValue, nil
	}

	return getFloat(value, defaultValue)
}

func New() *Module {
	return &Module{}
}
